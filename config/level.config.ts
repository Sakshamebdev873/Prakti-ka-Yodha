export interface Level {
    level: number;
    name: string;
    minScore: number;
    badgeToAward?: string; // The name of the badge to award upon reaching this level
}

// This array defines the entire leveling curve for your application.
export const LEVELS: Level[] = [
    { level: 1, name: "Eco-Sprout", minScore: 0 },
    { level: 2, name: "Eco-Watcher", minScore: 100, badgeToAward: "Level 2: Eco-Watcher" },
    { level: 3, name: "Eco-Advocate", minScore: 250, badgeToAward: "Level 3: Eco-Advocate" },
    { level: 4, name: "Eco-Hero", minScore: 500, badgeToAward: "Level 4: Eco-Hero" },
    { level: 5, name: "Eco-Champion", minScore: 1000, badgeToAward: "Level 5: Eco-Champion" },
    { level: 6, name: "Eco-Guardian", minScore: 1750, badgeToAward: "Level 6: Eco-Guardian" },
    { level: 7, name: "Eco-Innovator", minScore: 2500, badgeToAward: "Level 7: Eco-Innovator" },
    { level: 8, name: "Eco-Visionary", minScore: 5000, badgeToAward: "Level 8: Eco-Visionary" },
];

/**
 * A helper function to dynamically calculate a user's current level based on their ecoScore.
 * @param {number} score - The student's current ecoScore.
 * @returns {Level} The full level object for the student's current level.
 */
export const getLevelFromScore = (score: number): Level => {
    // Find the highest level the user has achieved by iterating backwards.
    for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (score >= LEVELS[i].minScore) {
            return LEVELS[i];
        }
    }
    return LEVELS[0]; // Default to level 1 if something goes wrong
};