import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../entity/user.entity";

// Define UserJwtPayload extending JwtPayload
export interface UserJwtPayload extends JwtPayload {
    userId: number;
    role: UserRole;
}

// Define RequestWithUser extending Request and specifying user property as UserJwtPayload
interface RequestWithUser extends Request {
    user: UserJwtPayload;
}

export default RequestWithUser;
