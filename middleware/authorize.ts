import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client'; // Import the Role enum from your Prisma client

/**
 * Creates a middleware function to authorize users based on their role.
 * This should be used AFTER the `authenticate` middleware.
 *
 * @param {Role[]} allowedRoles - An array of roles that are permitted to access the route.
 * @returns {Function} An Express middleware function.
 *
 * @example
 * // This will only allow users with the 'ADMIN' role.
 * router.get('/users', authenticate, authorize(['ADMIN']), getAllUsers);
 *
 * @example
 * // This will allow users with either 'TEACHER' or 'ADMIN' roles.
 * router.post('/challenges', authenticate, authorize(['TEACHER', 'ADMIN']), createChallenge);
 */
const authorize = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Get the user object from the request.
    // This is attached by the preceding `authenticate` middleware.
    const user = req.user;

    // 2. Check if the user object or role is missing.
    // This could happen if `authenticate` was not run first.
    if (!user || !user.role) {
      return res.status(403).json({ message: 'Forbidden: User role is not available.' });
    }

    // 3. Check if the user's role is included in the list of allowed roles.
    const userRole = user.role as Role; // Type assertion for safety
    if (!allowedRoles.includes(userRole)) {
      // If the user's role is not in the allowed list, deny access.
      return res.status(403).json({ 
        message: `Forbidden: A role of '${allowedRoles.join(' or ')}' is required to access this resource.` 
      });
    }

    // 4. If all checks pass, grant access.
    // The user has the required role, so proceed to the next middleware or the controller.
    next();
  };
};

export default authorize;