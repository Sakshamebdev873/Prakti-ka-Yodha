import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client'; // Import from Prisma
import { JwtPayload } from '../types/types'; // Import our custom payload type

/**
 * -----------------------------------------------------------------------------
 * 1. authenticate Middleware
 * -----------------------------------------------------------------------------
 * Verifies the JWT and attaches the full user payload to `req.user`.
 * Works with the new schema where JWT contains accountId, profileId, role, etc.
 */

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication token required.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token and cast it to our custom JwtPayload type
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
    
    // Attach the entire decoded payload to the request object.
    // The global type declaration we made ensures this is type-safe.
    req.user = decoded; 
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};


/**
 * -----------------------------------------------------------------------------
 * 2. authorize Middleware Factory
 * -----------------------------------------------------------------------------
 * Creates a middleware to authorize users based on their role.
 * This should be used AFTER the `authenticate` middleware.
 * This code requires almost no changes because it was already well-designed.
 *
 * @param {Role[]} allowedRoles - An array of roles permitted to access the route.
 */
export const authorize = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Get the user payload from the request.
    const user = req.user;

    // 2. Check if the user object or role is missing (safety check).
    if (!user || !user.role) {
      return res.status(403).json({ message: 'Forbidden: User role not available for authorization.' });
    }

    // 3. Check if the user's role is in the list of allowed roles.
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ 
        message: `Forbidden: A role of '${allowedRoles.join(' or ')}' is required to access this resource.` 
      });
    }

    // 4. If all checks pass, grant access.
    next();
  };
};