"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Use the special edge-compatible client
const edge_1 = require("@prisma/client/edge");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
// Create a single, enhanced Prisma Client instance
const prisma = new edge_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
// Export this single instance to be used everywhere in your app
exports.default = prisma;
