"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateUserProfile = exports.getUserProfile = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../libs/prisma"));
// In a real app, this would be fetched from a config or database
const VALID_AVATARS = [
    'https://example.com/avatars/eco-avatar-01.png',
    'https://example.com/avatars/eco-avatar-02.png',
    'https://example.com/avatars/eco-avatar-03.png',
];
// --- 1. Get Current User's Profile (Handles All Roles) ---
const getUserProfile = async (req, res) => {
    const { profileId, role } = req.user || {};
    if (!profileId || !role) {
        return res.status(401).json({ message: "Unauthorized: Invalid token payload." });
    }
    try {
        let userProfile = null;
        const commonInclude = { account: { select: { email: true, role: true } } };
        // Use a switch to query the correct role-specific table
        switch (role) {
            case 'STUDENT':
                userProfile = await prisma_1.default.student.findUnique({
                    where: { id: profileId },
                    include: commonInclude,
                });
                break;
            case 'TEACHER':
                userProfile = await prisma_1.default.teacher.findUnique({
                    where: { id: profileId },
                    include: commonInclude,
                });
                break;
            case 'INSTITUTION_ADMIN':
                userProfile = await prisma_1.default.institutionAdmin.findUnique({
                    where: { id: profileId },
                    include: commonInclude,
                });
                break;
            case 'ADMIN':
                userProfile = await prisma_1.default.admin.findUnique({
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
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error.', error });
    }
};
exports.getUserProfile = getUserProfile;
// --- 2. Update User's Profile (Name and Avatar - Handles All Roles) ---
const updateUserProfile = async (req, res) => {
    const { profileId, role } = req.user || {};
    const { name, avatar } = req.body;
    if (!profileId || !role) {
        return res.status(401).json({ message: "Unauthorized: Invalid token." });
    }
    const dataToUpdate = {};
    if (name)
        dataToUpdate.name = name;
    if (avatar && VALID_AVATARS.includes(avatar))
        dataToUpdate.avatar = avatar;
    if (Object.keys(dataToUpdate).length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update.' });
    }
    try {
        let updatedProfile = null;
        // Use a switch to update the correct role-specific table
        switch (role) {
            case 'STUDENT':
                updatedProfile = await prisma_1.default.student.update({ where: { id: profileId }, data: dataToUpdate });
                break;
            case 'TEACHER':
                updatedProfile = await prisma_1.default.teacher.update({ where: { id: profileId }, data: dataToUpdate });
                break;
            case 'INSTITUTION_ADMIN':
                updatedProfile = await prisma_1.default.institutionAdmin.update({ where: { id: profileId }, data: dataToUpdate });
                break;
            case 'ADMIN':
                updatedProfile = await prisma_1.default.admin.update({ where: { id: profileId }, data: dataToUpdate });
                break;
            default:
                return res.status(400).json({ message: "Invalid user role." });
        }
        return res.status(200).json(updatedProfile);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error while updating profile.' });
    }
};
exports.updateUserProfile = updateUserProfile;
// --- 3. Change Password (Interacts with Account model - Universal for all roles) ---
const changePassword = async (req, res) => {
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
        const account = await prisma_1.default.account.findUnique({ where: { id: accountId } });
        if (!account) {
            return res.status(404).json({ message: 'Account not found.' });
        }
        // 2. Verify the old password
        const isPasswordCorrect = await bcryptjs_1.default.compare(oldPassword, account.passwordHash);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: 'Incorrect old password.' });
        }
        // 3. Hash the new password and update the account
        const newPasswordHash = await bcryptjs_1.default.hash(newPassword, 12);
        await prisma_1.default.account.update({
            where: { id: accountId },
            data: { passwordHash: newPasswordHash },
        });
        // 4. SECURITY: Invalidate all existing refresh tokens for this account
        await prisma_1.default.refreshToken.updateMany({
            where: { accountId: accountId, revoked: false },
            data: { revoked: true },
        });
        return res.status(200).json({ message: 'Password updated successfully. For security, you have been logged out from all devices.' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error while changing password.' });
    }
};
exports.changePassword = changePassword;
