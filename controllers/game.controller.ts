import { Request, Response } from 'express';
import { getLevelFromScore } from '../config/level.config';
import prisma from '../libs/prisma';

// A simple in-code config for the external games library.
// This could be moved to its own config file.
const EXTERNAL_GAMES_CONFIG = {
    'nasa-climate-kids': { name: "NASA's Climate Game", requiredLevel: 3, url: 'https://climatekids.nasa.gov/recycling-rhapsody/', points: 10 },
    'wwf-conservation-game': { name: "WWF Conservation Challenge", requiredLevel: 5, url: 'https://www.worldwildlife.org/pages/games', points: 15 },
    'stop-disasters': { name: "Stop Disasters!", requiredLevel: 8, url: 'https://www.stopdisastersgame.org/play-the-game/', points: 20 },
};

/**
 * Gets the list of all games and the student's unlock & play status for each.
 */
export const getGameLibrary = async (req: Request, res: Response) => {
    const studentId = req.user?.profileId;
    if (!studentId) return res.status(401).json({ message: "Unauthorized." });

    try {
        const [student, playedGames] = await Promise.all([
            prisma.student.findUnique({ where: { id: studentId }, select: { ecoScore: true } }),
            prisma.playedGame.findMany({ where: { studentId }, select: { gameId: true } })
        ]);

        if (!student) return res.status(404).json({ message: "Student not found." });

        const studentLevel = getLevelFromScore(student.ecoScore).level;
        const playedGameIds = new Set(playedGames.map(g => g.gameId));

        const gameLibrary = Object.entries(EXTERNAL_GAMES_CONFIG).map(([id, game]) => ({
            id,
            name: game.name,
            requiredLevel: game.requiredLevel,
            url: game.url,
            points: game.points,
            isUnlocked: studentLevel >= game.requiredLevel,
            hasBeenPlayed: playedGameIds.has(id),
        }));

        res.status(200).json(gameLibrary);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching game library." });
    }
};

/**
 * Logs that a student has clicked to play a game and awards a one-time point bonus.
 */
export const logGamePlayed = async (req: Request, res: Response) => {
    const studentId = req.user?.profileId;
    const { gameId } = req.params;
    if (!studentId) return res.status(401).json({ message: "Unauthorized." });

    const game = EXTERNAL_GAMES_CONFIG[gameId as keyof typeof EXTERNAL_GAMES_CONFIG];
    if (!game) return res.status(404).json({ message: "Game not found." });

    try {
        const updatedStudent = await prisma.$transaction(async (tx) => {
            const student = await tx.student.findUnique({ where: { id: studentId }, select: { ecoScore: true } });
            if (!student) throw new Error("Student not found.");

            const studentLevel = getLevelFromScore(student.ecoScore).level;
            if (studentLevel < game.requiredLevel) {
                throw new Error("You have not unlocked this game yet.");
            }

            const existingPlayRecord = await tx.playedGame.findUnique({
                where: { studentId_gameId: { studentId, gameId } },
            });
            if (existingPlayRecord) {
                throw new Error("You have already received points for this game.");
            }

            // Award points and check for level up (reusing the same logic)
            const oldScore = student.ecoScore;
            const newScore = oldScore + game.points;
            const oldLevel = getLevelFromScore(oldScore);
            const newLevel = getLevelFromScore(newScore);

            if (newLevel.level > oldLevel.level && newLevel.badgeToAward) {
                 const levelUpBadge = await tx.badge.findUnique({ where: { name: newLevel.badgeToAward } });
                 if (levelUpBadge) {
                    await tx.badgeUser.upsert({
                        where: { studentId_badgeId: { studentId, badgeId: levelUpBadge.id } },
                        create: { studentId, badgeId: levelUpBadge.id },
                        update: {}
                    });
                 }
            }

            const studentAfterUpdate = await tx.student.update({
                where: { id: studentId },
                data: { ecoScore: newScore }
            });

            await tx.playedGame.create({ data: { studentId, gameId } });

            return studentAfterUpdate;
        });

        res.status(200).json({
            message: `Discovery Bonus! You earned ${game.points} ecoScore points.`,
            newEcoScore: updatedStudent.ecoScore
        });

    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};