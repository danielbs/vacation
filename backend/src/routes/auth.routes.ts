import express, {Router} from "express"; // Importing Express and Router
import AuthController from "../controller/auth.controller"; // Importing the AuthController
import {loginValidator, registerValidator} from "../dto/user.login.dto"; // Importing validators for login and registration
import {upload} from "../config/multer.config"; // Importing multer for file uploads

const authRoutes = Router(); // Creating an instance of Router for authentication routes

const authController = new AuthController(); // Creating an instance of the AuthController

// Defining routes with their respective handlers
authRoutes.post("/login", loginValidator, authController.login); // Route for user login
authRoutes.post("/register", registerValidator, authController.register); // Route for user registration
authRoutes.delete("/logout", authController.logout); // Route for user logout
authRoutes.get("/refresh", authController.refresh); // Route for token refresh

export default authRoutes; // Exporting the authentication routes
