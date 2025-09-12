"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.refreshToken = exports.signIn = exports.registerTeacher = exports.signUp = void 0;
const prisma_js_1 = __importDefault(require("../libs/prisma.js"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_js_1 = require("../libs/generateToken.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// --- 1a. Student Registration ---
const signUp = async (req, res) => {
    // Students must provide the ID of their institution upon registration
    const { name, email, password, avatar, joinCode } = req.body;
    if (!name || !email || !password || !joinCode) {
        return res.status(400).json({ message: 'Name, email, password, and join Code are required.' });
    }
    const institution = await prisma_js_1.default.institution.findUnique({ where: { joinCode } });
    if (!institution) {
        return res.status(404).json({ message: 'Invalid join code.' });
    }
    const institutionId = institution.id;
    try {
        // Check if the institution exists
        const institution = await prisma_js_1.default.institution.findUnique({ where: { id: institutionId } });
        if (!institution) {
            return res.status(404).json({ message: 'Institution not found.' });
        }
        const existingUser = await prisma_js_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 12);
        const user = await prisma_js_1.default.user.create({
            data: {
                name,
                email,
                passwordHash,
                avatar: avatar,
                role: 'STUDENT', // Role is explicitly set to STUDENT
                institutionId: institutionId, // Link user to their institution
            },
        });
        res.status(201).json({ message: 'Student registered successfully!', userId: user.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration.', error });
    }
};
exports.signUp = signUp;
// --- 1b. Teacher Registration (via Invitation) ---
const registerTeacher = async (req, res) => {
    // Teachers must provide a valid invitation token
    const { name, email, password, avatar, token } = req.body;
    if (!name || !email || !password || !token) {
        return res.status(400).json({ message: 'Name, email, password, and invitation token are required.' });
    }
    try {
        // 1. Find the invitation by the unique token
        const invitation = await prisma_js_1.default.teacherInvitation.findUnique({ where: { token } });
        if (!invitation || invitation.status !== 'PENDING' || invitation.expiresAt < new Date()) {
            return res.status(400).json({ message: 'Invalid or expired invitation token.' });
        }
        // 2. Ensure the email used for registration matches the invitation email
        if (invitation.email !== email) {
            return res.status(400).json({ message: 'Email does not match the invitation.' });
        }
        const existingUser = await prisma_js_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }
        // Use a transaction to ensure both user creation and invitation update succeed
        const user = await prisma_js_1.default.$transaction(async (tx) => {
            const passwordHash = await bcryptjs_1.default.hash(password, 12);
            // 3. Create the user with the TEACHER role
            const newTeacher = await tx.user.create({
                data: {
                    name,
                    email,
                    passwordHash,
                    avatar: avatar,
                    role: 'TEACHER', // Role is explicitly set to TEACHER
                    institutionId: invitation.institutionId, // Set institution from invitation
                },
            });
            // 4. Mark the invitation as ACCEPTED so it cannot be reused
            await tx.teacherInvitation.update({
                where: { id: invitation.id },
                data: { status: 'ACCEPTED' },
            });
            return newTeacher;
        });
        res.status(201).json({ message: 'Teacher account created successfully!', userId: user.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during teacher registration.', error });
    }
};
exports.registerTeacher = registerTeacher;
// --- 2. User Login (No changes needed) ---
const signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        const user = await prisma_js_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const isPasswordCorrect = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const accessToken = (0, generateToken_js_1.generateAccessToken)(user);
        const refreshToken = await (0, generateToken_js_1.generateRefreshToken)(user);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.json({ msg: "Logged in Successfully!", accessToken });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error during login.', error });
    }
};
exports.signIn = signIn;
const refreshToken = async (req, res) => {
    const tokenFromCookie = req.cookies.refreshToken;
    if (!tokenFromCookie) {
        return res.status(401).json({ message: 'Refresh token not found.' });
    }
    try {
        // 1. Verify the token using the REFRESH_TOKEN_SECRET
        const payload = jsonwebtoken_1.default.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET);
        // 2. Perform a fast, direct lookup for the token's JTI in the database
        const dbToken = await prisma_js_1.default.refreshToken.findUnique({
            where: { jti: payload.jti },
        });
        // 3. Check if the token exists in the DB and has not been revoked
        if (!dbToken || dbToken.revoked) {
            return res.status(403).json({ message: 'Invalid or revoked refresh token.' });
        }
        // 4. Find the user associated with the token
        const user = await prisma_js_1.default.user.findUnique({ where: { id: dbToken.userId } });
        if (!user) {
            return res.status(403).json({ message: 'User not found.' });
        }
        // 5. Generate a new Access Token
        const newAccessToken = (0, generateToken_js_1.generateAccessToken)(user);
        res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        // This will catch expired tokens or tampered tokens
        return res.status(403).json({ message: 'Invalid refresh token.' });
    }
};
exports.refreshToken = refreshToken;
// --- 4. User Logout (OPTIMIZED) ---
const signOut = async (req, res) => {
    const tokenFromCookie = req.cookies.refreshToken;
    // Always clear the cookie regardless of what happens next
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    if (!tokenFromCookie) {
        return res.status(204).send(); // No content to send
    }
    try {
        const payload = jsonwebtoken_1.default.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET);
        // Invalidate the token in the database by its JTI
        // You can either delete it or mark it as revoked
        await prisma_js_1.default.refreshToken.update({
            where: { jti: payload.jti },
            data: { revoked: true }, // Marking as revoked is often better for auditing
        });
    }
    catch (err) {
        // If the token is invalid/expired, we don't need to do anything in the DB.
        // The cookie is already cleared, so the user is logged out.
        console.error("SignOut: Invalid refresh token provided.", err);
    }
    res.status(200).json({ message: 'Logged out successfully.' });
};
exports.signOut = signOut;
