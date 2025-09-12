import { Request, Response } from "express";
import prisma from "../../libs/prisma";

export const getPlatformStats = async (req: Request, res: Response) => {
  try {
    const cacheStrategy = {
      ttl: 600, // Cache results for 10 minutes (600 seconds)
      swr: 60, // Optional: stale-while-revalidate. Serve stale data for 60s while fetching fresh data in the background.
    };

    const totalUsers = await prisma.user.count({ cacheStrategy });
    const totalInstitutions = await prisma.institution.count({ cacheStrategy });
    const totalChallengesCompleted = await prisma.userChallenge.count({
      where: { status: "COMPLETED" },
      cacheStrategy,
    });
    const totalSubmissions = await prisma.submission.count({ cacheStrategy });

    res.status(200).json({
      totalUsers,
      totalInstitutions,
      totalChallengesCompleted,
      totalSubmissions,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching platform stats.", error });
  }
};
