import type { Request, Response } from 'express';
export declare const signUp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const signIn: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const refreshToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const signOut: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authControllers.d.ts.map