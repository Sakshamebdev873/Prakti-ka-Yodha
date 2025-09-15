import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../libs/prisma';
import { generateAccessToken, generateRefreshToken } from '../libs/generateToken.js';
import { Role } from '@prisma/client';

// --- 1. Student Registration ---
export const registerStudent = async (req: Request, res: Response) => {
    const { name, email, password, avatar, joinCode, academicDetails } = req.body;

    if (!name || !email || !password || !joinCode) {
        return res.status(400).json({ message: 'Name, email, password, and join code are required.' });
    }

    try {
        const institution = await prisma.institution.findUnique({ where: { joinCode } });
        if (!institution) {
            return res.status(404).json({ message: 'Invalid join code.' });
        }

        const existingAccount = await prisma.account.findUnique({ where: { email } });
        if (existingAccount) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }

        // Use a transaction to create the Account and Student profile together
        const { studentProfile } = await prisma.$transaction(async (tx) => {
            const passwordHash = await bcrypt.hash(password, 12);

            const newAccount = await tx.account.create({
                data: { email, passwordHash, role: Role.STUDENT },
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

// --- 2. Teacher & Institution Admin Registration (Generic Invitation Handler) ---
const handleInvitationRegistration = async (req: Request, res: Response, role: Role) => {
    const { name, email, password, avatar, token } = req.body;

    if (!name || !email || !password || !token) {
        return res.status(400).json({ message: 'All fields and token are required.' });
    }

    try {
        const invitation = await prisma.teacherInvitation.findUnique({ where: { token } });
        if (!invitation || invitation.status !== 'PENDING' || invitation.expiresAt < new Date() || invitation.email !== email) {
            return res.status(400).json({ message: 'Invalid, expired, or mismatched invitation token.' });
        }

        const existingAccount = await prisma.account.findUnique({ where: { email } });
        if (existingAccount) {
            return res.status(409).json({ message: 'An account with this email already exists.' });
        }

        const { profile } = await prisma.$transaction(async (tx) => {
            const passwordHash = await bcrypt.hash(password, 12);
            const account = await tx.account.create({ data: { email, passwordHash, role } });

            let profile: any;
            if (role === Role.TEACHER) {
                profile = await tx.teacher.create({
                    data: { name, avatar, institutionId: invitation.institutionId, accountId: account.id },
                });
            } else if (role === Role.INSTITUTION_ADMIN) {
                profile = await tx.institutionAdmin.create({
                    data: { name, avatar, institutionId: invitation.institutionId, accountId: account.id },
                });
            }

            await tx.teacherInvitation.update({ where: { id: invitation.id }, data: { status: 'ACCEPTED' } });
            return { profile };
        });

        res.status(201).json({ message: `${role.charAt(0) + role.slice(1).toLowerCase()} account created successfully!`, profileId: profile.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Server error during ${role.toLowerCase()} registration.` });
    }
};

export const registerTeacher = (req: Request, res: Response) => handleInvitationRegistration(req, res, Role.TEACHER);
export const registerInstitutionAdmin = (req: Request, res: Response) => handleInvitationRegistration(req, res, Role.INSTITUTION_ADMIN);

// --- 3. Universal Sign In ---
export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

    try {
        const account = await prisma.account.findUnique({ where: { email } });
        if (!account) return res.status(401).json({ message: 'Invalid credentials.' });

        const isPasswordCorrect = await bcrypt.compare(password, account.passwordHash);
        if (!isPasswordCorrect) return res.status(401).json({ message: 'Invalid credentials.' });

        let profile: any = null;
        switch (account.role) {
            case Role.STUDENT:
                profile = await prisma.student.findUnique({ where: { accountId: account.id } });
                break;
            case Role.TEACHER:
                profile = await prisma.teacher.findUnique({ where: { accountId: account.id } });
                break;
            case Role.INSTITUTION_ADMIN:
                profile = await prisma.institutionAdmin.findUnique({ where: { accountId: account.id } });
                break;
            case Role.ADMIN:
                profile = await prisma.admin.findUnique({ where: { accountId: account.id } });
                break;
        }

        if (!profile) return res.status(404).json({ message: 'User profile not found for this account.' });

        const tokenPayload = {
            accountId: account.id,
            profileId: profile.id,
            role: account.role,
            institutionId: profile.institutionId || null,
        };

        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = await generateRefreshToken(account.id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Logged in Successfully!", accessToken });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login.', error });
    }
};

// --- 4. Refresh Token (Universal) ---
export const refreshToken = async (req: Request, res: Response) => {
    const tokenFromCookie = req.cookies.refreshToken;
    if (!tokenFromCookie) return res.status(401).json({ message: 'Refresh token not found.' });

    try {
        const payload = jwt.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET as string) as { accountId: string, jti: string };
        const dbToken = await prisma.refreshToken.findUnique({ where: { jti: payload.jti } });

        if (!dbToken || dbToken.revoked) return res.status(403).json({ message: 'Invalid or revoked refresh token.' });

        const account = await prisma.account.findUnique({ where: { id: dbToken.accountId } });
        if (!account) return res.status(403).json({ message: 'Account not found.' });

        // Repeat the logic from signIn to get the profileId
        let profile: any = null;
        switch (account.role) {
            case Role.STUDENT:
                profile = await prisma.student.findUnique({ where: { accountId: account.id } });
                break;
            case Role.TEACHER:
                profile = await prisma.teacher.findUnique({ where: { accountId: account.id } });
                break;
            // ... add other roles
        }
        if (!profile) return res.status(404).json({ message: 'User profile not found.' });

        const newAccessToken = generateAccessToken({
            accountId: account.id,
            profileId: profile.id,
            role: account.role,
            institutionId: profile.institutionId || null,
        });

        res.json({ accessToken: newAccessToken });
    } catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token.' });
    }
};

// --- 5. Sign Out (Universal) ---
export const signOut = async (req: Request, res: Response) => {
    const tokenFromCookie = req.cookies.refreshToken;
    res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
    if (!tokenFromCookie) return res.sendStatus(204);

    try {
        const payload = jwt.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET as string) as { jti: string };
        await prisma.refreshToken.update({
            where: { jti: payload.jti },
            data: { revoked: true },
        });
    } catch (err) {
        // Ignore errors if token is invalid, just clear the cookie
    }
    
    res.status(200).json({ message: 'Logged out successfully.' });
};