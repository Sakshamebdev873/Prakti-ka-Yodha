import { Role } from '@prisma/client';
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: number | string;
  }
}
export interface AuthRequest extends Request {
  userId?: number; // added by auth middleware
}
// src/types/express/index.d.ts

// 1. Make sure to import the User role from prisma if you want to use it

// 2. Define the shape of your JWT payload
interface JwtPayload {
  userId: string;
  role: Role; // Use the Role enum from your Prisma schema
}

// 3. Extend the Express Request interface
declare global {
  namespace Express {
    export interface Request {
      // Attach the user property to the Request object
      user?: JwtPayload;
    }
  }
}