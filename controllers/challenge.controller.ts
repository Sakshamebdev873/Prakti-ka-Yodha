import { Request, Response } from "express";
import prisma from "../libs/prisma";
import { ChallengeStatus } from "@prisma/client";
import { getLevelFromScore } from "../config/level.config";

/**
 * @route   GET /api/challenges
 * @desc    Gets a list of all challenges available to the student.
 *          It intelligently filters out challenges the student has already started or completed.
 * @access  Private (Student only)
 */
export const getAvailableChallenges = async (req: Request, res: Response) => {
  const studentId = req.user?.profileId;
  const institutionId = req.user?.institutionId;
  if (!studentId || !institutionId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing user details." });
  }
  try {
    // Step 1: Find the IDs of all challenges the student is already involved with.
    const engagedChallengeIds = (
      await prisma.userChallenge.findMany({
        where: { studentId },
        select: { challengeId: true },
      })
    ).map((c) => c.challengeId);
    const classroomsAssignments = await prisma.classroomUser.findMany({
      where: { studentId },
      include: {
        classroom: {
          include: { classRoomChallenges: true },
        },
      },
    });
    const classRoomChallengeIds = classroomsAssignments
      .flatMap((cu) => cu.classroom.classRoomChallenges)
      .map((cc) => cc.challengeId);
    // Step 3: Fetch all challenges that are either global OR assigned to their class,
    //         AND that they haven't already started.
    const availableChallenges = await prisma.challenge.findMany({
      where: {
        id: { notIn: engagedChallengeIds },
        OR: [
          {
            // 1. It is a "global" challenge (not tied to any specific classroom).
            //    (This assumes global challenges are not assigned to any classroom,
            assignedInClassrooms: { none: {} },
          },
          {
            id: { in: classRoomChallengeIds },
          },
        ],
      },
      orderBy: { points: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        type: true,
        points: true,
      },
    });
    res.status(200).json(availableChallenges);
  } catch (error) {
    console.error("Error fetching available challenges:", error);
    res.status(500).json({ message: "Server error fetching challenges." });
  }
};
/**
 * @route   POST /api/challenges/:challengeId/start
 * @desc    Allows a student to officially start or accept a challenge.
 * @access  Private (Student only)
 */
export const startChallenge = async (req:Request,res : Response) =>{
    const studentId = req.user?.profileId
    const {challengeId} = req.params
    if(!studentId){
        return res.status(401).json({ message: "Unauthorized." });
    }
    try {
        const existingUserChallenge = await prisma.userChallenge.findUnique({
            where : {studentId_challengeId : {studentId,challengeId}}
        })
        if(existingUserChallenge){
               return res.status(409).json({ message: "You have already started this challenge." });
        }
        const userChallenge = await prisma.userChallenge.create({
            data : {
                studentId,challengeId,status : ChallengeStatus.PENDING
            }
        })
        res.status(201).json(userChallenge)
    } catch (error) {
        console.error("Error starting challenge:", error);
        // This could fail if the challengeId is invalid (P2025 error code)
        res.status(500).json({ message: "Server error starting challenge." });
   
    }
}
/**
 * @route   POST /api/challenges/user-challenge/:userChallengeId/complete
 * @desc    Marks a simple (e.g., DAILY, WEEKLY) challenge as complete and awards points.
 * @access  Private (Student only)
 */
export const completedChallenge = async (req: Request, res: Response) => {
    const studentId = req.user?.profileId;
    const { userChallengeId } = req.params;

    if (!studentId) {
        return res.status(401).json({ message: "Unauthorized." });
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            // Step 1: Find the UserChallenge to verify ownership and status
            const userChallenge = await tx.userChallenge.findFirst({
                where: { id: userChallengeId, studentId: studentId }, // Security Check
                include: { challenge: { select: { points: true, type: true } } }
            });

            if (!userChallenge) throw new Error("Challenge not found or you do not have permission.");
            if (userChallenge.status !== 'PENDING') throw new Error(`Challenge is already ${userChallenge.status}.`);
            if (userChallenge.challenge.type === 'PROJECT') throw new Error("Project challenges must be approved by a teacher.");

            // Step 2: Get the student's current score to calculate level change
            const student = await tx.student.findUnique({ where: { id: studentId }, select: { ecoScore: true } });
            if (!student) throw new Error("Student profile not found.");

            const oldScore = student.ecoScore;
            const pointsAwarded = userChallenge.challenge.points;
            const newScore = oldScore + pointsAwarded;

            // --- LEVEL-UP & BADGE LOGIC ---
            const oldLevel = getLevelFromScore(oldScore);
            const newLevel = getLevelFromScore(newScore);

            if (newLevel.level > oldLevel.level) {
                console.log(`LEVEL UP! Student ${studentId} reached Level ${newLevel.level}: ${newLevel.name}`);
                if (newLevel.badgeToAward) {
                    const levelUpBadge = await tx.badge.findUnique({ where: { name: newLevel.badgeToAward } });
                    if (levelUpBadge) {
                        // Use upsert to safely award the badge without crashing if it already exists
                        await tx.badgeUser.upsert({
                            where: { studentId_badgeId: { studentId, badgeId: levelUpBadge.id } },
                            create: { studentId, badgeId: levelUpBadge.id },
                            update: {}
                        });
                    }
                }
            }
            // --- END OF LOGIC ---

            // Step 3: Update the challenge status
            const updatedUserChallenge = await tx.userChallenge.update({
                where: { id: userChallengeId },
                data: { status: 'COMPLETED', completedAt: new Date() }
            });

            // Step 4: Update the student's ecoScore
            await tx.student.update({
                where: { id: studentId },
                data: { ecoScore: newScore } // Use the calculated new score
            });

            return updatedUserChallenge;
        });

        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};