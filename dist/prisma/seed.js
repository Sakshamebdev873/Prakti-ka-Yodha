"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Use a central Prisma client instance
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Starting database seed process for the new architecture...');
    // 1. Get credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
        throw new Error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file for seeding.');
    }
    // 2. Check if an admin ACCOUNT already exists to prevent re-running
    const existingAdminAccount = await prisma.account.findFirst({
        where: { role: client_1.Role.ADMIN },
    });
    if (existingAdminAccount) {
        console.log('✅ Admin account already exists. Seeding is not required.');
        return; // Exit if the admin account already exists
    }
    // 3. --- The Core Logic for the New Schema ---
    // Use a transaction to ensure both the Account and Admin profile are created, or neither is.
    console.log(' Admin account not found. Creating one...');
    await prisma.$transaction(async (tx) => {
        // Step A: Hash the password
        const passwordHash = await bcryptjs_1.default.hash(adminPassword, 12);
        // Step B: Create the central Account record
        const newAdminAccount = await tx.account.create({
            data: {
                email: adminEmail,
                passwordHash,
                role: client_1.Role.ADMIN, // Set the role on the account for easy lookups
            },
        });
        console.log(` -> Created Account for ${adminEmail}`);
        // Step C: Create the corresponding Admin profile and link it to the new Account
        await tx.admin.create({
            data: {
                name: 'Platform Admin',
                // Link the profile back to the account using the ID from the previous step
                accountId: newAdminAccount.id,
            },
        });
        console.log(` -> Created Admin profile and linked it to the account.`);
    });
    console.log('✅ Successfully created the first platform admin user.');
    console.log('🌱 Seeding finished.');
}
main()
    .catch((e) => {
    console.error('❌ An error occurred during the seed process:', e);
    process.exit(1);
})
    .finally(async () => {
    // Ensure the Prisma client disconnects properly
    await prisma.$disconnect();
});
