import { Request, Response } from "express";
import prisma from "../../libs/prisma"; // Your central, accelerated Prisma client

/**
 * @route   GET /api/admin/dashboard/stats
 * @desc    (Platform Admin) Get high-level, cached statistics for the entire platform.
 * @access  Private (Admin only)
 */
export const getPlatformStats = async (req: Request, res: Response) => {
  try {
    // Caching strategy for expensive, platform-wide aggregations.
    const cacheStrategy = {
      ttl: 600, // Cache results for 10 minutes
      swr: 60,  // Serve stale data for 1 min while revalidating
    };

    // --- NEW, MORE GRANULAR QUERIES ---

    // 1. Count users by their specific roles.
    //    These queries are more informative than a single `totalUsers`.
    const totalStudents = await prisma.student.count({ cacheStrategy });
    const totalTeachers = await prisma.teacher.count({ cacheStrategy });
    const totalInstitutionAdmins = await prisma.institutionAdmin.count({ cacheStrategy });

    // 2. Count institutions (this query remains the same).
    const totalInstitutions = await prisma.institution.count({ cacheStrategy });

    // 3. Count total challenges completed by students.
    //    The table `userChallenge` is now linked to `Student`.
    const totalChallengesCompleted = await prisma.userChallenge.count({
      where: { status: "COMPLETED" },
      cacheStrategy,
    });

    // 4. Count total project submissions from students.
    const totalSubmissions = await prisma.submission.count({ cacheStrategy });


    // --- Construct a more detailed response object ---
    res.status(200).json({
      userCounts: {
        students: totalStudents,
        teachers: totalTeachers,
        institutionAdmins: totalInstitutionAdmins,
        // The total is the sum of all role profiles
        total: totalStudents + totalTeachers + totalInstitutionAdmins,
      },
      institutionCount: totalInstitutions,
      activityCounts: {
        challengesCompleted: totalChallengesCompleted,
        projectSubmissions: totalSubmissions,
      }
    });

  } catch (error) {
    console.error("Error fetching platform stats:", error);
    res.status(500).json({ message: "Error fetching platform stats.", error });
  }
};