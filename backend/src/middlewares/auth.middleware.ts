import { NextFunction, Request, Response } from "express"; // Importing necessary modules and classes
import ApiError from "../exceptions/api.error.exception"; // Importing the ApiError class
import AuthService from "../services/auth.service"; // Importing the AuthService class
import RequestWithUser from "../interfaces/RequestWithUser.interface"; // Importing the RequestWithUser interface

// Defining the authMiddleware function with the standard (req, res, next) signature
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authService: AuthService = new AuthService(); // Creating an instance of the AuthService class
        const authorizationHeader = req.headers.authorization; // Extracting the authorization header from the request
        
        // Checking if the authorization header exists
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError()); // If not, return an unauthorized error
        }
        
        const accessToken = authorizationHeader.split(' ')[1]; // Extracting the access token from the authorization header
        
        // Checking if the access token exists
        if (!accessToken) {
            return next(ApiError.UnauthorizedError()); // If not, return an unauthorized error
        }
        
        const user = authService.validateAccessToken(accessToken); // Validating the access token using the AuthService
        
        // Checking if the user exists
        if (!user) {
            return next(ApiError.UnauthorizedError()); // If not, return an unauthorized error
        }
        
        (req as RequestWithUser).user = user; // Assigning the user object to the request object
        next(); // Passing control to the next middleware function
    } catch (e) {
        next(ApiError.UnauthorizedError()); // If an error occurs, return an unauthorized error
    }
}
