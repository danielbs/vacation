import {NextFunction, Request, Response} from "express"; // Importing necessary modules
import {UserRole} from "../entity/user.entity"; // Importing the UserRole enum
import RequestWithUser from "../interfaces/RequestWithUser.interface"; // Importing the RequestWithUser interface
import ApiError from "../exceptions/api.error.exception"; // Importing the ApiError class

// Defining the roleMiddleware function that takes a requiredRole parameter
export default function roleMiddleware(requiredRole: UserRole) {
    // Returning a middleware function with the standard (req, res, next) signature
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Extracting the user object from the request (assuming it's added by a previous middleware)
            const user = (req as RequestWithUser).user;
            // Checking if there's no user or if the user's role doesn't match the requiredRole
            if (!user || !user.role || user.role !== requiredRole) {
                // If the conditions aren't met, return a ForbiddenError using the next function
                return next(ApiError.ForbiddenError());
            }
            // If the user has the required role, call the next middleware in the chain
            next();
        } catch (e) {
            // If an error occurs, return a ForbiddenError using the next function
            next(ApiError.ForbiddenError());
        }
    };
}
