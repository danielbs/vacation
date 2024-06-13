import { check } from "express-validator";
import { User, UserRole } from "../entity/user.entity";

// Validator middleware for user registration
export const registerValidator = [
    check("firstName")
        .isAlpha().withMessage("First name should contain only letters")
        .isLength({min: 1}).withMessage("First name is required")
        .notEmpty().withMessage("First name is required")
        .trim(),
    check("lastName")
        .isAlpha().withMessage("Last name should contain only letter")
        .isLength({min: 1}).withMessage("Last name is required")
        .notEmpty().withMessage("Last name is required")
        .trim(),
    check("email")
        .isEmail().withMessage("Invalid email address")
        .notEmpty().withMessage("Email address is required")
        .trim(),
    check("password")
        .isLength({ min: 4 }).withMessage("Password must be at least 4 characters long")
        .notEmpty().withMessage("Password is required"),
    check("role")
        .optional()
        .isIn(["USER", "ADMIN"]).withMessage("Invalid role specified"),
];

// Validator middleware for user login
export const loginValidator = [
    check("email")
        .isEmail().withMessage("Invalid email address")
        .notEmpty().withMessage("Email address is required")
        .trim(),
    check("password")
        .isLength({ min: 4 }).withMessage("Password must be at least 4 characters long")
        .notEmpty().withMessage("Password is required"),
]

// Data transfer object (DTO) for user registration
export class UserRegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Data transfer object (DTO) for user login
export class UserLoginDto {
    email: string;
    password: string;
}

// Data transfer object (DTO) for user details with access token
export class UserDto {
    accessToken: string;
    user: {
        id: number | undefined;
        firstName: string | undefined;
        lastName: string | undefined;
        email: string | undefined;
        role: UserRole | undefined;
    }
    constructor(accessToken: string, user: User) {
        this.accessToken = accessToken;
        this.user = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };
    }
}
