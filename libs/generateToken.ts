import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '@prisma/client';
import prisma from './prisma'; // Your central, shared Prisma client

/**
 * The required structure for the JWT access token payload.
 */
interface AccessTokenPayload {
  accountId: string;
  profileId: string;
  role: Role;
  institutionId?: string | null;
}

/**
 * Generates a short-lived Access Token.
 * This function is now strongly typed and expects a specific payload structure.
 *
 * @param {AccessTokenPayload} payload - The user data to encode in the token.
 * @returns {string} The signed JWT access token.
 */
export const generateAccessToken = (payload: AccessTokenPayload): string => {
  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: '15m' } // Standard short-lived duration
  );
};

/**
 * Generates a long-lived Refresh Token as a JWT.
 * It is linked to the central Account ID, not a specific role profile.
 *
 * @param {string} accountId - The ID of the user's central Account record.
 * @returns {Promise<string>} The signed JWT refresh token.
 */
export const generateRefreshToken = async (accountId: string): Promise<string> => {
  // 1. Generate a unique ID for this specific token
  const jti = uuidv4();

  // 2. Create the Refresh Token JWT. The payload only needs the accountId
  //    to identify the user's login session.
  const refreshToken = jwt.sign(
    { accountId },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: '7d', // Standard long-lived duration
      jwtid: jti,      // Standard claim for JWT ID (jti)
    }
  );

  // 3. Store the token's jti in the database, linked to the Account ID.
  //    This aligns with the new schema.
  await prisma.refreshToken.create({
    data: {
      jti: jti,
      accountId: accountId,
    }
  });

  // 4. Return the signed JWT to be sent to the client
  return refreshToken;
};