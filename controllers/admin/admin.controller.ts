import { InstitutionType} from "@prisma/client";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import prisma from '../../libs/prisma'

const generateUniqueJoinCode = async (name: string): Promise<string> => {
  // 1. Create a short, clean base from the institution name (e.g., "Greenwood High" -> "GREE")
  const base = name.replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase();
  
  let uniqueCode = '';
  let attempts = 0;

  // 2. Loop until a unique code is found (to prevent collisions)
  while (!uniqueCode && attempts < 10) {
    // Generate a random 3-digit number
    const suffix = Math.floor(1000 + Math.random() * 9000).toString().substring(1);
    const candidateCode = `${base}-${suffix}`;

    // 3. Check if this code already exists in the database
    const existing = await prisma.institution.findUnique({
      where: { joinCode: candidateCode },
    });

    // If it doesn't exist, we've found our unique code!
    if (!existing) {
      uniqueCode = candidateCode;
    }
    attempts++;
  }

  // If we couldn't find a unique code after 10 tries, throw an error
  if (!uniqueCode) {
    throw new Error('Failed to generate a unique join code.');
  }

  return uniqueCode;
};

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
    const joinCode = await generateUniqueJoinCode(name)
    const institution = await prisma.institution.create({
      data: { name, type :type as InstitutionType , address ,joinCode},
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
export const inviteInstitution = async (req:Request,res:Response) =>{
  const {email,institutionId} = req.body
  if(!email|| !institutionId) {
    return res.status(400).json({message :'Email and institutionId are required.' })
  }
  const adminUserId = (req as any).user.userId
  try {
    const institution = await prisma.institution.findUnique({
      where : {id : institutionId}
    })
    if(!institution){
      return res.status(404).json({message : "Institution not found."})
    }
    const expiresAt = new Date(Date.now() + 7*24*60*60*1000)
    const token = uuidv4()
    const invitation = await prisma.teacherInvitation.create({
      data  :{
        email,institutionId,token,expiresAt,invitedBy : adminUserId
      }
    })
    const registrationLink = `${process.env.FRONTEND_URL}/register/institution-admin?token=${token}`;
        console.log(`
        ============================================================
        (Email Simulation) Sending Institution Admin Invite to: ${email}
        Registration Link: ${registrationLink}
        ============================================================
        `);

        // 7. Send a success response
        res.status(201).json({ 
            message: `Invitation sent successfully to ${email}.`, 
            invitation 
        });

  } catch (error : any) {
    if(error.code === 'P2002') {
            return res.status(409).json({ message: 'This email has already been invited to this institution.' });
        }

        // Handle generic server errors
        console.error("Error sending institution admin invitation:", error);
        res.status(500).json({ message: 'Server error during invitation process.' });
  }
}