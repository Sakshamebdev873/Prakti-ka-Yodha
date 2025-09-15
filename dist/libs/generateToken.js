"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const prisma_1 = __importDefault(require("./prisma")); // Your central, shared Prisma client
/**
 * Generates a short-lived Access Token.
 * This function is now strongly typed and expects a specific payload structure.
 *
 * @param {AccessTokenPayload} payload - The user data to encode in the token.
 * @returns {string} The signed JWT access token.
 */
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' } // Standard short-lived duration
    );
};
exports.generateAccessToken = generateAccessToken;
/**
 * Generates a long-lived Refresh Token as a JWT.
 * It is linked to the central Account ID, not a specific role profile.
 *
 * @param {string} accountId - The ID of the user's central Account record.
 * @returns {Promise<string>} The signed JWT refresh token.
 */
const generateRefreshToken = async (accountId) => {
    // 1. Generate a unique ID for this specific token
    const jti = (0, uuid_1.v4)();
    // 2. Create the Refresh Token JWT. The payload only needs the accountId
    //    to identify the user's login session.
    const refreshToken = jsonwebtoken_1.default.sign({ accountId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d', // Standard long-lived duration
        jwtid: jti, // Standard claim for JWT ID (jti)
    });
    // 3. Store the token's jti in the database, linked to the Account ID.
    //    This aligns with the new schema.
    await prisma_1.default.refreshToken.create({
        data: {
            jti: jti,
            accountId: accountId,
        }
    });
    // 4. Return the signed JWT to be sent to the client
    return refreshToken;
};
exports.generateRefreshToken = generateRefreshToken;
