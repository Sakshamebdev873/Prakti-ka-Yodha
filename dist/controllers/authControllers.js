"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.refreshToken = exports.signIn = exports.signUp = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_js_1 = require("../libs/generateToken.js");
const prisma = new client_1.PrismaClient();
// --- 1. User Registration ---
const signUp = async (req, res) => {
    const { name, email, password, avatar } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                avatar: avatar
            },
        });
        res.status(201).json({ message: 'User created successfully!', userId: user.id });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error during registration.', error });
    }
};
exports.signUp = signUp;
// --- 2. User Login ---
const signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const isPasswordCorrect = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        // Generate tokens
        const accessToken = (0, generateToken_js_1.generateAccessToken)(user);
        const refreshToken = await (0, generateToken_js_1.generateRefreshToken)(user);
        // Send refresh token in a secure, httpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        // Send access token in the response body
        res.json({ msg: "Logged in Successfuly......", accessToken });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error during login.', error });
    }
};
exports.signIn = signIn;
// --- 3. Token Refresh ---
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found.' });
    }
    try {
        // Find all non-revoked tokens for the user
        const userTokens = await prisma.refreshToken.findMany({
            where: { revoked: false }
        });
        let validToken = null;
        for (const token of userTokens) {
            const isValid = await bcryptjs_1.default.compare(refreshToken, token.hashedToken);
            if (isValid) {
                validToken = token;
                break;
            }
        }
        if (!validToken) {
            return res.status(403).json({ message: 'Invalid refresh token.' });
        }
        const user = await prisma.user.findUnique({ where: { id: validToken.userId } });
        if (!user) {
            return res.status(403).json({ message: 'User not found.' });
        }
        const newAccessToken = (0, generateToken_js_1.generateAccessToken)(user);
        res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error during token refresh.', error });
    }
};
exports.refreshToken = refreshToken;
// --- 4. User Logout ---
const signOut = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(204).send(); // No content to send
    }
    try {
        const userTokens = await prisma.refreshToken.findMany({ where: { revoked: false } });
        for (const token of userTokens) {
            const isValid = await bcryptjs_1.default.compare(refreshToken, token.hashedToken);
            if (isValid) {
                // Invalidate the token by deleting it
                await prisma.refreshToken.delete({ where: { id: token.id } });
                break;
            }
        }
    }
    catch (err) {
        // Continue to clear cookie even if DB operation fails
        console.error("Error deleting refresh token from DB", err);
    }
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully.' });
};
exports.signOut = signOut;
