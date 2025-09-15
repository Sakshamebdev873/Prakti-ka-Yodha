import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../libs/prisma';
// In a real app, this would be fetched from a config or database
const VALID_AVATARS = [
    'https://example.com/avatars/eco-avatar-01.png',
    'https://example.com/avatars/eco-avatar-02.png',
    'https://example.com/avatars/eco-avatar-03.png',
];

// --- 1. Get Current User's Profile (Handles All Roles) ---
export const getUserProfile = async (req: Request, res: Response) => {
  const { profileId, role } = req.user || {};

  if (!profileId || !role) {
    return res.status(401).json({ message: "Unauthorized: Invalid token payload." });
  }

  try {
    let userProfile: any = null;
    const commonInclude = { account: { select: { email: true, role: true } } };

    // Use a switch to query the correct role-specific table
    switch (role) {
      case 'STUDENT':
        userProfile = await prisma.student.findUnique({
          where: { id: profileId },
          include: commonInclude,
        });
        break;
      case 'TEACHER':
        userProfile = await prisma.teacher.findUnique({
          where: { id: profileId },
          include: commonInclude,
        });
        break;
      case 'INSTITUTION_ADMIN':
        userProfile = await prisma.institutionAdmin.findUnique({
          where: { id: profileId },
          include: commonInclude,
        });
        break;
      case 'ADMIN':
        userProfile = await prisma.admin.findUnique({
          where: { id: profileId },
          include: commonInclude,
        });
        break;
      default:
        return res.status(400).json({ message: "Invalid user role." });
    }

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found.' });
    }

    // Sanitize the response: remove the nested account and elevate the properties
    const { account, ...profile } = userProfile;
    const response = { ...profile, ...account };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error });
  }
};

// --- 2. Update User's Profile (Name and Avatar - Handles All Roles) ---
export const updateUserProfile = async (req: Request, res: Response) => {
    const { profileId, role } = req.user || {};
    const { name, avatar } = req.body;

    if (!profileId || !role) {
        return res.status(401).json({ message: "Unauthorized: Invalid token." });
    }

    const dataToUpdate: { name?: string; avatar?: string } = {};
    if (name) dataToUpdate.name = name;
    if (avatar && VALID_AVATARS.includes(avatar)) dataToUpdate.avatar = avatar;

    if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update.' });
    }

    try {
        let updatedProfile: any = null;

        // Use a switch to update the correct role-specific table
        switch (role) {
            case 'STUDENT':
                updatedProfile = await prisma.student.update({ where: { id: profileId }, data: dataToUpdate });
                break;
            case 'TEACHER':
                updatedProfile = await prisma.teacher.update({ where: { id: profileId }, data: dataToUpdate });
                break;
            case 'INSTITUTION_ADMIN':
                updatedProfile = await prisma.institutionAdmin.update({ where: { id: profileId }, data: dataToUpdate });
                break;
            case 'ADMIN':
                updatedProfile = await prisma.admin.update({ where: { id: profileId }, data: dataToUpdate });
                break;
            default:
                return res.status(400).json({ message: "Invalid user role." });
        }

        return res.status(200).json(updatedProfile);
    } catch (error) {
        return res.status(500).json({ message: 'Server error while updating profile.' });
    }
};

// --- 3. Change Password (Interacts with Account model - Universal for all roles) ---
export const changePassword = async (req: Request, res: Response) => {
    const { accountId } = req.user || {}; // Use accountId from the token
    const { oldPassword, newPassword } = req.body;

    if (!accountId) {
        return res.status(401).json({ message: "Unauthorized: Invalid token." });
    }
    if (!oldPassword || !newPassword || newPassword.length < 8) {
        return res.status(400).json({ message: 'Old password and a new password (min 8 chars) are required.' });
    }

    try {
        // 1. Fetch the account (not the profile) to get the password hash
        const account = await prisma.account.findUnique({ where: { id: accountId } });
        if (!account) {
            return res.status(404).json({ message: 'Account not found.' });
        }

        // 2. Verify the old password
        const isPasswordCorrect = await bcrypt.compare(oldPassword, account.passwordHash);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: 'Incorrect old password.' });
        }

        // 3. Hash the new password and update the account
        const newPasswordHash = await bcrypt.hash(newPassword, 12);
        await prisma.account.update({
            where: { id: accountId },
            data: { passwordHash: newPasswordHash },
        });

        // 4. SECURITY: Invalidate all existing refresh tokens for this account
        await prisma.refreshToken.updateMany({
            where: { accountId: accountId, revoked: false },
            data: { revoked: true },
        });

        return res.status(200).json({ message: 'Password updated successfully. For security, you have been logged out from all devices.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error while changing password.' });
    }
};