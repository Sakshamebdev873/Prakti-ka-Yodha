"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../libs/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
async function main() {
    console.log('🌱 Starting database seed process...');
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword) {
        throw new Error('❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set for seeding.');
    }
    const existingAdmin = await prisma_1.default.user.findFirst({ where: { role: client_1.Role.ADMIN } });
    if (existingAdmin) {
        console.log('✅ Admin user already exists. Skipping creation.');
        return;
    }
    console.log(' Admin user not found. Creating one...');
    const passwordHash = await bcryptjs_1.default.hash(adminPassword, 12);
    await prisma_1.default.user.create({
        data: {
            email: adminEmail,
            passwordHash,
            name: 'Platform Admin',
            role: client_1.Role.ADMIN,
            // The institutionId is simply omitted, and will be NULL by default.
            // No placeholder institution needed!
        },
    });
    console.log('✅ Successfully created the first admin user.');
    console.log('🌱 Seeding finished.');
}
main()
    .catch((e) => {
    console.error('❌ An error occurred during the seed process:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
