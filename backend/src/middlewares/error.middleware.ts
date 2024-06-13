import express from "express"; // Importing the express module
import ApiError from "../exceptions/api.error.exception"; // Importing the ApiError class

// Defining the error middleware function with the standard (err, req, res, next) signature
export default function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    // Checking if the error is an instance of ApiError
    if (err instanceof ApiError) {
        // If it is, log the error message and return a JSON response with the error message and status
        console.error(err.message);
        return res.status(err.status).json({ message: err.message, status: err.errors });
    }
    // If the error is not an instance of ApiError, log the error and return a generic 500 status with a message
    console.error(err);
    return res.status(500).json({ message: "Unexpected error" });
}
