
import { Role } from "@prisma/client";

export interface Payload {
  id: string;
  role: Role;
}


declare global {
  namespace Express {
    export interface Request {
      user?: Payload;

      
      session?: {
        token?: string;
      } | null;
    }
  }
}
export {};