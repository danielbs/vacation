import express, { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import { UserLoginDto, UserRegisterDto } from "../dto/user.login.dto";
import RequestWithBody from "../interfaces/RequstWithBody.interface";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api.error.exception";
import RequestWithCookies from "../interfaces/RequestWithCookies.interface";


class AuthController {
    private readonly authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }


    // Method for handling user login
    login = async (req: RequestWithBody<UserLoginDto>, res: Response, next: NextFunction) => {
        try { // Handling potential errors during execution
            const errors = validationResult(req); // Validating request body using express-validator
            if (!errors.isEmpty()) { // Checking if validation errors exist
                throw ApiError.BadRequest("error", errors.array()); // Throwing a bad request error with validation errors
            }
            const userLoginDto = req.body; // Extracting user login data from request body
            const user = await this.authService.login(userLoginDto); // Calling AuthService to handle user login
            const refreshToken = await this.authService.createRefreshToken(user.user.id, user.user.role); // Generating refresh token
            // Setting refresh token as a cookie with specific options
            res.cookie("refreshToken", refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // Setting expiration time for the cookie (30 days)
                sameSite: "none", // Setting same-site attribute to "none" for cross-site requests
                secure: true, // Ensuring the cookie is only sent over HTTPS
            });
            return res.json(user); // Sending JSON response with user data
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }

    // Method for handling user registration
    register = async (req: RequestWithBody<UserRegisterDto>, res: Response, next: NextFunction) => {
        try { // Handling potential errors during execution
            const errors = validationResult(req); // Validating request body using express-validator
            if (!errors.isEmpty()) { // Checking if validation errors exist
                throw ApiError.BadRequest("error", errors.array()); // Throwing a bad request error with validation errors
            }
            const userRegisterDto = req.body; // Extracting user registration data from request body
            const user = await this.authService.register(userRegisterDto); // Calling AuthService to handle user registration
            const refreshToken = await this.authService.createRefreshToken(user.user.id, user.user.role); // Generating refresh token
            // Setting refresh token as a cookie with specific options
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true, // Ensuring the cookie is only accessible through HTTP requests
                maxAge: 30 * 24 * 60 * 60 * 1000, // Setting expiration time for the cookie (30 days)
                sameSite: "none", // Setting same-site attribute to "none" for cross-site requests
                secure: true // Ensuring the cookie is only sent over HTTPS
            });
            return res.json(user); // Sending JSON response with user data
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }

    // Method for handling user logout
    logout = async (req: Request, res: Response, next: NextFunction) => {
        try { // Handling potential errors during execution
            res.clearCookie("refreshToken"); // Clearing the refresh token cookie
            // Setting an empty refresh token cookie with specific options
            res.cookie("refreshToken", "", {
                httpOnly: true, // Ensuring the cookie is only accessible through HTTP requests
                maxAge: 0, // Setting expiration time for the cookie to 0 (expires immediately)
                sameSite: "none", // Setting same-site attribute to "none" for cross-site requests
                secure: true // Ensuring the cookie is only sent over HTTPS
            });
            return res.sendStatus(200); // Sending HTTP status 200 (OK)
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }

    refresh = async (req: RequestWithCookies, res: express.Response, next: NextFunction) => { // Arrow function expression for the refresh method
        try { // Handling any potential errors that may occur during execution of the method
            const { refreshToken } = req.cookies; // Extracting the refresh token from the request cookies
            // Refreshing the user's authentication using the refresh token
            const user = await this.authService.refresh(refreshToken);
            // Generating a new refresh token for the user
            const newRefreshToken = await this.authService.createRefreshToken(user.user.id, user.user.role);
            // Setting the new refresh token in a cookie with specified options
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true, // Only accessible via HTTP(S)
                maxAge: 30 * 24 * 60 * 60 * 1000, // Expiry time of 30 days
                sameSite: "none", // Restricting cookie to same-site requests
                secure: true // Ensuring cookie is sent only over HTTPS
            });
            // Sending JSON response with the refreshed user data
            return res.json(user);
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }

}

export default AuthController;