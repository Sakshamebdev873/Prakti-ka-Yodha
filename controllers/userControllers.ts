import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Re-use the avatar list for validation. In a larger app, you'd move this to a shared constants file.
const VALID_AVATARS = [
    'https://example.com/avatars/eco-avatar-01.png',
    'https://example.com/avatars/eco-avatar-02.png',
    'https://example.com/avatars/eco-avatar-03.png',
    'https://example.com/avatars/eco-avatar-04.png',
];

// --- 1. Get Current User's Profile ---
export const getUserProfile = async (req: Request, res: Response): Promise<Response> => {
  // The user's ID is attached to the request by the `authenticate` middleware
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      // IMPORTANT: Select only the fields that are safe to send to the client
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        ecoScore: true,
        streakCount: true,
        createdAt: true,
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Server error.', error });
  }
};


// --- 2. Update User's Profile (Name and Avatar) ---
export const updateUserProfile = async (req: Request, res: Response): Promise<Response> => {
  const userId = req.user?.userId;
  const { name, avatar } = req.body;

  // Build an object with only the fields that the user wants to update
  const dataToUpdate: { name?: string; avatar?: string } = {};

  if (name) {
    if (typeof name !== 'string' || name.length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters long." });
    }
    dataToUpdate.name = name;
  }
  
  if (avatar) {
    if (!VALID_AVATARS.includes(avatar)) {
      return res.status(400).json({ message: 'Invalid avatar selected.' });
    }
    dataToUpdate.avatar = avatar;
  }

  // Check if there is anything to update
  if (Object.keys(dataToUpdate).length === 0) {
    return res.status(400).json({ message: 'No valid fields provided for update.' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
      select: { // Again, only return safe fields
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        ecoScore: true,
        streakCount: true,
      }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while updating profile.', error });
  }
};


// --- 3. Change User's Password ---
export const changePassword = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user?.userId;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Both old and new passwords are required.' });
    }

    if (newPassword.length < 8) {
        return res.status(400).json({ message: 'New password must be at least 8 characters long.' });
    }

    try {
        // We MUST fetch the user with the password hash to verify the old password
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: 'Incorrect old password.' });
        }

        // Hash the new password and update it in the database
        const newPasswordHash = await bcrypt.hash(newPassword, 12);
        await prisma.user.update({
            where: { id: userId },
            data: { passwordHash: newPasswordHash },
        });

        // We should also consider revoking all existing refresh tokens here for security
        await prisma.refreshToken.deleteMany({
            where: { userId: userId }
        });

        return res.status(200).json({ message: 'Password updated successfully. Please log in again.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error while changing password.', error });
    }
};