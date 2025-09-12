// Use the special edge-compatible client
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

// Create a single, enhanced Prisma Client instance
const prisma = new PrismaClient().$extends(withAccelerate());

// Export this single instance to be used everywhere in your app
export default prisma;