import { Role } from "@prisma/client";

// This defines the structure of the decoded JWT payload
export interface JwtPayload {
    accountId: string;
    profileId: string;
    role: Role;
    institutionId?: string | null;
    challengeId : string;
}

// This extends the global Express Request interface
// It tells TypeScript that our Request objects will have a 'user' property of type JwtPayload
declare global {
    namespace Express {
        export interface Request {
            user?: JwtPayload;
        }
    }
}