"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("./prisma"));
const uuid_1 = require("uuid"); // For generating unique token IDs
// No changes needed here, but ensure the secret is in your .env
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};
exports.generateAccessToken = generateAccessToken;
/**
 * OPTIMIZED: Generates a long-lived Refresh Token as a JWT.
 * It stores the JWT's unique ID (jti) in the database for fast lookups.
 */
const generateRefreshToken = async (user) => {
    // 1. Generate a unique ID for this specific token
    const jti = (0, uuid_1.v4)();
    // 2. Create the Refresh Token JWT
    const refreshToken = jsonwebtoken_1.default.sign({
        userId: user.id,
        role: user.role, // You can include the role or other non-sensitive data
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d', // A standard long-lived duration
        jwtid: jti, // Standard claim for JWT ID
    });
    // 3. Store the token's jti in the database
    await prisma_1.default.refreshToken.create({
        data: {
            jti: jti,
            userId: user.id,
        }
    });
    // 4. Return the signed JWT to be sent to the client
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
