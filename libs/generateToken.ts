import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid'; // For generating unique token IDs

const prisma = new PrismaClient();

// No changes needed here, but ensure the secret is in your .env
export const generateAccessToken = (user: any) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '15m' }
  );
};

/**
 * OPTIMIZED: Generates a long-lived Refresh Token as a JWT.
 * It stores the JWT's unique ID (jti) in the database for fast lookups.
 */
export const generateRefreshToken = async (user: any) => {
  // 1. Generate a unique ID for this specific token
  const jti = uuidv4();

  // 2. Create the Refresh Token JWT
  const refreshToken = jwt.sign(
    {
      userId: user.id,
      role: user.role, // You can include the role or other non-sensitive data
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '7d', // A standard long-lived duration
      jwtid: jti,      // Standard claim for JWT ID
    }
  );

  // 3. Store the token's jti in the database
  await prisma.refreshToken.create({
    data : {
      jti: jti,
      userId: user.id,
    }
  });

  // 4. Return the signed JWT to be sent to the client
  return refreshToken;
};