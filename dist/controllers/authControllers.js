"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.refreshToken = exports.signIn = exports.registerInstitutionAdmin = exports.registerTeacher = exports.registerStudent = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../libs/prisma"));
const generateToken_js_1 = require("../libs/generateToken.js");
const client_1 = require("@prisma/client");
// --- 1. Student Registration ---
const registerStudent = async (req, res) => {
    const { name, email, password, avatar, joinCode, academicDetails } = req.body;
    if (!name || !email || !password || !joinCode) {
        return res.status(400).json({ message: 'Name, email, password, and join code are required.' });
    }
    try {
        const institution = await prisma_1.default.institution.findUnique({ where: { joinCode } });
        if (!institution) {
            return res.status(404).json({ message: 'Invalid join code.' });
        }
        const existingAccount = await prisma_1.default.account.findUnique({ where: { email } });
        if (existingAccount) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }
        // Use a transaction to create the Account and Student profile together
        const { studentProfile } = await prisma_1.default.$transaction(async (tx) => {
            const passwordHash = await bcryptjs_1.default.hash(password, 12);
            const newAccount = await tx.account.create({
                data: { email, passwordHash, role: client_1.Role.STUDENT },
            });
            const studentProfile = await tx.student.create({
                data: {
                    name,
                    avatar,
                    institutionId: institution.id,
                    accountId: newAccount.id,
                    academicProfile: academicDetails ? { create: academicDetails } : undefined,
                },
            });
            return { newAccount, studentProfile };
        });
        res.status(201).json({ message: 'Student registered successfully!', studentId: studentProfile.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};
exports.registerStudent = registerStudent;
// --- 2. Teacher & Institution Admin Registration (Generic Invitation Handler) ---
const handleInvitationRegistration = async (req, res, role) => {
    const { name, email, password, avatar, token } = req.body;
    if (!name || !email || !password || !token) {
        return res.status(400).json({ message: 'All fields and token are required.' });
    }
    try {
        const invitation = await prisma_1.default.teacherInvitation.findUnique({ where: { token } });
        if (!invitation || invitation.status !== 'PENDING' || invitation.expiresAt < new Date() || invitation.email !== email) {
            return res.status(400).json({ message: 'Invalid, expired, or mismatched invitation token.' });
        }
        const existingAccount = await prisma_1.default.account.findUnique({ where: { email } });
        if (existingAccount) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }
        const { profile } = await prisma_1.default.$transaction(async (tx) => {
            const passwordHash = await bcryptjs_1.default.hash(password, 12);
            const account = await tx.account.create({ data: { email, passwordHash, role } });
            let profile;
            if (role === client_1.Role.TEACHER) {
                profile = await tx.teacher.create({
                    data: { name, avatar, institutionId: invitation.institutionId, accountId: account.id },
                });
            }
            else if (role === client_1.Role.INSTITUTION_ADMIN) {
                profile = await tx.institutionAdmin.create({
                    data: { name, avatar, institutionId: invitation.institutionId, accountId: account.id },
                });
            }
            await tx.teacherInvitation.update({ where: { id: invitation.id }, data: { status: 'ACCEPTED' } });
            return { profile };
        });
        res.status(201).json({ message: `${role.charAt(0) + role.slice(1).toLowerCase()} account created successfully!`, profileId: profile.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: `Server error during ${role.toLowerCase()} registration.` });
    }
};
const registerTeacher = (req, res) => handleInvitationRegistration(req, res, client_1.Role.TEACHER);
exports.registerTeacher = registerTeacher;
const registerInstitutionAdmin = (req, res) => handleInvitationRegistration(req, res, client_1.Role.INSTITUTION_ADMIN);
exports.registerInstitutionAdmin = registerInstitutionAdmin;
// --- 3. Universal Sign In ---
const signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Email and password are required.' });
    try {
        const account = await prisma_1.default.account.findUnique({ where: { email } });
        if (!account)
            return res.status(401).json({ message: 'Invalid credentials.' });
        const isPasswordCorrect = await bcryptjs_1.default.compare(password, account.passwordHash);
        if (!isPasswordCorrect)
            return res.status(401).json({ message: 'Invalid credentials.' });
        let profile = null;
        switch (account.role) {
            case client_1.Role.STUDENT:
                profile = await prisma_1.default.student.findUnique({ where: { accountId: account.id } });
                break;
            case client_1.Role.TEACHER:
                profile = await prisma_1.default.teacher.findUnique({ where: { accountId: account.id } });
                break;
            case client_1.Role.INSTITUTION_ADMIN:
                profile = await prisma_1.default.institutionAdmin.findUnique({ where: { accountId: account.id } });
                break;
            case client_1.Role.ADMIN:
                profile = await prisma_1.default.admin.findUnique({ where: { accountId: account.id } });
                break;
        }
        if (!profile)
            return res.status(404).json({ message: 'User profile not found for this account.' });
        const tokenPayload = {
            accountId: account.id,
            profileId: profile.id,
            role: account.role,
            institutionId: profile.institutionId || null,
        };
        const accessToken = (0, generateToken_js_1.generateAccessToken)(tokenPayload);
        const refreshToken = await (0, generateToken_js_1.generateRefreshToken)(account.id);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ message: "Logged in Successfully!", accessToken });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error during login.', error });
    }
};
exports.signIn = signIn;
// --- 4. Refresh Token (Universal) ---
const refreshToken = async (req, res) => {
    const tokenFromCookie = req.cookies.refreshToken;
    if (!tokenFromCookie)
        return res.status(401).json({ message: 'Refresh token not found.' });
    try {
        const payload = jsonwebtoken_1.default.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET);
        const dbToken = await prisma_1.default.refreshToken.findUnique({ where: { jti: payload.jti } });
        if (!dbToken || dbToken.revoked)
            return res.status(403).json({ message: 'Invalid or revoked refresh token.' });
        const account = await prisma_1.default.account.findUnique({ where: { id: dbToken.accountId } });
        if (!account)
            return res.status(403).json({ message: 'Account not found.' });
        // Repeat the logic from signIn to get the profileId
        let profile = null;
        switch (account.role) {
            case client_1.Role.STUDENT:
                profile = await prisma_1.default.student.findUnique({ where: { accountId: account.id } });
                break;
            case client_1.Role.TEACHER:
                profile = await prisma_1.default.teacher.findUnique({ where: { accountId: account.id } });
                break;
            // ... add other roles
        }
        if (!profile)
            return res.status(404).json({ message: 'User profile not found.' });
        const newAccessToken = (0, generateToken_js_1.generateAccessToken)({
            accountId: account.id,
            profileId: profile.id,
            role: account.role,
            institutionId: profile.institutionId || null,
        });
        res.json({ accessToken: newAccessToken });
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token.' });
    }
};
exports.refreshToken = refreshToken;
// --- 5. Sign Out (Universal) ---
const signOut = async (req, res) => {
    const tokenFromCookie = req.cookies.refreshToken;
    res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
    if (!tokenFromCookie)
        return res.sendStatus(204);
    try {
        const payload = jsonwebtoken_1.default.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET);
        await prisma_1.default.refreshToken.update({
            where: { jti: payload.jti },
            data: { revoked: true },
        });
    }
    catch (err) {
        // Ignore errors if token is invalid, just clear the cookie
    }
    res.status(200).json({ message: 'Logged out successfully.' });
};
exports.signOut = signOut;
