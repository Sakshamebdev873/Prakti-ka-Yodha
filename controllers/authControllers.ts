import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../libs/generateToken.js';
import type { Request, Response } from 'express';

const prisma = new PrismaClient();

// --- 1. User Registration ---
export const signUp = async (req : Request, res:Response) => {
  const { name, email, password,avatar } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        avatar : avatar
      },
    });

    res.status(201).json({ message: 'User created successfully!', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration.', error });
  }
};

// --- 2. User Login ---
export const signIn = async (req: Request, res : Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    // Send refresh token in a secure, httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send access token in the response body
    res.json({ msg : "Logged in Successfuly......",accessToken });

  } catch (error) {
    res.status(500).json({ message: 'Server error during login.', error });
  }
};


// --- 3. Token Refresh ---
export const refreshToken = async (req : Request, res : Response) => {
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
    for(const token of userTokens) {
        const isValid = await bcrypt.compare(refreshToken, token.hashedToken);
        if(isValid) {
            validToken = token;
            break;
        }
    }
    
    if (!validToken) {
      return res.status(403).json({ message: 'Invalid refresh token.' });
    }

    const user = await prisma.user.findUnique({ where: { id: validToken.userId }});
    if(!user) {
        return res.status(403).json({ message: 'User not found.' });
    }

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });

  } catch (error) {
    res.status(500).json({ message: 'Server error during token refresh.', error });
  }
};


// --- 4. User Logout ---
export const signOut = async (req : Request, res : Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(204).send(); // No content to send
    }

    try {
        const userTokens = await prisma.refreshToken.findMany({ where: { revoked: false }});
        
        for(const token of userTokens) {
            const isValid = await bcrypt.compare(refreshToken, token.hashedToken);
            if(isValid) {
                // Invalidate the token by deleting it
                await prisma.refreshToken.delete({ where: { id: token.id }});
                break;
            }
        }
    } catch(err) {
        // Continue to clear cookie even if DB operation fails
        console.error("Error deleting refresh token from DB", err);
    }
    
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully.' });
};