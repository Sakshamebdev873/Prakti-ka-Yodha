"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
// Generates a short-lived Access Token
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' } // Standard practice: short-lived
    );
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = async (user) => {
    const refreshToken = crypto_1.default.randomBytes(32).toString('hex');
    const hashedToken = await bcryptjs_1.default.hash(refreshToken, 10);
    await prisma.refreshToken.create({
        data: {
            userId: user.id,
            hashedToken: hashedToken,
        },
    });
    // Return the un-hashed token to send to the client
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
