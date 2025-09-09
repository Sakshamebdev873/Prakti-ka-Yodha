import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Generates a short-lived Access Token
export const generateAccessToken = (user :any) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '15m' } // Standard practice: short-lived
  );
};


export const generateRefreshToken = async (user : any) => {
  const refreshToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = await bcrypt.hash(refreshToken, 10);

  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      hashedToken: hashedToken,
    },
  });

  // Return the un-hashed token to send to the client
  return refreshToken;
};