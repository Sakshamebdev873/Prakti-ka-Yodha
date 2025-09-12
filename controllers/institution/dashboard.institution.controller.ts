import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();
export const getInstitutionStats = async (req: Request, res: Response) => {
  const institutionId = (req as any).user.institutionId;
  try {
    const totalStudents = await prisma.user.count({
      where: { institutionId, role: "STUDENT" },
    });
    const totalTeachers = await prisma.user.count({
      where: { institutionId, role: "TEACHER" },
    });
    const ecoScoreAggregation = await prisma.user.aggregate({
      _sum: { ecoScore: true },
      where: { institutionId },
    });
    const totalEcoScore = ecoScoreAggregation._sum.ecoScore || 0;
    const topStudents = await prisma.user.findMany({
      where: { institutionId, role: "STUDENT" },
      orderBy: { ecoScore: "desc" },
      take: 5,
      select: { name: true, ecoScore: true },
    });
    res.status(200).json({
      totalStudents,
      totalTeachers,
      totalEcoScore,
      topStudents,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching institution stats.", error });
  }
};

export const inviteTeacher = async (req: Request, res: Response) => {
  const { email } = req.body;
  const institutionAdmin = (req as any).user;
  if (!email) {
    return res.status(400).json({ message: "Teacher's email is required" });
  }
  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const token = uuidv4();
    const invitation = await prisma.teacherInvitation.create({
      data: {
        email,
        institutionId: institutionAdmin.institutionId,
        token,
        expiresAt,
        invitedBy: institutionAdmin.userId,
      },
    });
    const registrationLink = `https://yourapp.com/register/teacher?token=${token}`;
    console.log(`(Email Sim) Teacher invite for ${email}: ${registrationLink}`);

    res
      .status(201)
      .json({ message: "Teacher invitation sent successfully.", invitation });
  } catch (error) {
    res.status(500).json({ message: "Error sending invitation.", error });
  }
};

export const getUsersInInstitution = async (req: Request, res: Response) => {
  const institutionId = (req as any).user.institutionId;
  try {
    const users = await prisma.user.findMany({
      where: { institutionId },
      select: { id: true, name: true, email: true, role: true, ecoScore: true },
      orderBy: { name: "asc" },
    });
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro fetching institution users.", error });
  }
};

export const getClassroomsInInstitution = async (
  req: Request,
  res: Response
) => {
  const institutionId = (req as any).user.institutionId;
  try {
    const classrooms = await prisma.classroom.findMany({
      where: { teacher: { institutionId } },
      include: {
        teacher: { select: { name: true } },
        _count: { select: { students: true } },
      },
    });
    res.status(200).json({ classrooms });
  } catch (error) {
    res.status(500).json({ message: "Error fetching classrooms ", error });
  }
};

export const getTeacherInInstitution = async (req: Request, res: Response) => {
  const institutionId = (req as any).user.institutionId;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 15;
  const skip = (page - 1) * limit;
  try {
    const teachers = await prisma.user.findMany({
      where: {
        institutionId,
        role: "TEACHER",
      },
      skip,
      take: limit,
      select: { id: true, name: true, email: true, createdAt: true },
      orderBy: { name: "asc" },
    });
    const totalTeachers = await prisma.user.count({
      where: { institutionId, role: "TEACHER" },
    });
    res
      .status(200)
      .json({
        data: teachers,
        currentPage: page,
        totalPage: Math.ceil(totalTeachers / limit),
      });
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
  }
};

export const getPendingInvitations = async (req: Request, res: Response) => {
  const institutionId = (req as any).user.institutionId;
  try {
    const invitations = await prisma.teacherInvitation.findMany({
      where: { institutionId, status: "PENDING" },
      select: { id: true, email: true, expiresAt: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(invitations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching pending invitations.", error });
  }
};

export const deleteTeacherInvitation = async (req: Request, res: Response) => {
  const { invitationId } = req.params;
  const institutionId = (req as any).user.institutionId;
  try {
    await prisma.teacherInvitation.delete({
      where: {
        id: invitationId,
        institutionId,
      },
    });
    res
      .status(200)
      .json({ message: "Teacher invitation has been revoked successfully" });
  } catch (error) {
    if ((error as any).code === "P2025") {
      return res
        .status(404)
        .json({
          message:
            "Invitation not found or you do not have permission to delete it.",
        });
    }
    res.status(500).json({ message: "Error revoking invitation.", error });
  }
};

export const deleteTeacher = async (req: Request, res: Response) => {
  const { teacherId } = req.params;
  const institutionId = (req as any).user.institutionId;
  try {
    await prisma.user.delete({
      where: {
        id: teacherId,
        institutionId,
        role: "TEACHER",
      },
    });
    res
      .status(200)
      .json({ message: "Teacher has been removed from the instituion." });
  } catch (error) {
    if ((error as any) === "P2025") {
      return res
        .status(404)
        .json({
          message:
            "Teacher not found in this institution or you do not have permission to remove them.",
        });
    }
    res.status(500).json({ message: "Error removing teacher.", error });
  }
};
