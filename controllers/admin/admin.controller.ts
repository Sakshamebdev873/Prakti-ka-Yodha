import { InstitutionType, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

export const createInstitution = async (req: Request, res: Response) => {
  const { name, type, address } = req.body;
  if (!name || !type) {
    return res
      .status(400)
      .json({ message: "Institution name and type are required" });
  }
  try {
    const existingInstitution = await prisma.institution.findUnique({
      where: { name },
    });
    if (existingInstitution) {
      return res
        .status(400)
        .json({ message: "An institution with this name is already exists" });
    }
    const institution = await prisma.institution.create({
      data: { name, type, address },
    });
    res.status(200).json({ institution });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating institution .", err });
  }
};

export const getAllInstitutions = async (req: Request, res: Response) => {
  try {
    const institutions = await prisma.institution.findMany({
      orderBy: { name: "asc" },
    });
    if (institutions.length === 0) {
      return res.status(400).json({ msg: "no institution exists" });
    }
    res.status(200).json({ institutions });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching institutions .", error });
  }
};

export const updateInstitution = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, type, address } = req.body;
  if (!type || !Object.values(InstitutionType).includes(type)) {
    return res.status(400).json({
      message: `Invalid institution type. Must be one of: ${Object.values(
        InstitutionType
      ).join(", ")}`,
    });
  }
  if (!name || !type || !address) {
    return res.status(400).json({ msg: "Please fill all fields..." });
  }
  if (typeof name !== "string" || typeof address !== "string") {
    return res.status(400).json({ msg: "Fields should be string.." });
  }
  try {
    const institution = await prisma.institution.update({
      where: { id },
      data: { name, type: type as InstitutionType, address },
    });
    res.status(200).json({ institution });
  } catch (error) {
    res.status(500).json({ msg: "Error updating institution.", error });
  }
};
export const deleteInstitution = async (req: Request, res: Response) => {
  const { institutionId } = req.params;
  if (!institutionId) {
    return res.status(400).json({ msg: "Please provide the institution Id" });
  }
  try {
    await prisma.institution.delete({
      where: { id: institutionId },
    });
    res.status(200).json({ msg: "Institution deleted Successfully" });
  } catch (error) {
    console.error("Failed to delete Institution.", error);
    res.status(500).json({msg : "Server error during institution deletion"})
  }
};
