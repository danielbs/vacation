import express from "express"; // Importing Express to create the server.
import cors from "cors"; // Importing CORS middleware to enable cross-origin resource sharing.
import "reflect-metadata"; // Importing Reflect-metadata polyfill which is required by some libraries such as TypeORM.
import {AppDataSource} from "./config/db.config"; // Importing the database configuration.
import routes from "./routes"; // Importing defined routes from the routes module.
import errorMiddleware from "./middlewares/error.middleware"; // Importing custom middleware for error handling.
import path from "node:path"; // Importing the path module to handle file paths.
import cookieParser from "cookie-parser"; // Importing cookieParser middleware to parse cookie header and populate req.cookies.
import morgan from "morgan"; // Importing morgan middleware for HTTP request logging.

const app = express(); // Creating an instance of an express application.

// Using morgan to log HTTP requests. "combined" outputs the Apache style logs.
app.use(morgan("combined"));

// Configuring CORS to accept requests from any origin and allow credentials such as cookies.
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true
}));

// Using cookieParser to parse cookies attached to the client request object.
app.use(cookieParser());

// Express middleware to parse JSON payloads, making it easy to handle JSON input.
app.use(express.json());

// Serving static files from the "uploads" directory. Uses path.join to ensure the path is correctly formed.
app.use(express.static(path.join(__dirname, "..", "uploads")));

// Setting up base route for API and attaching route handlers.
app.use("/api/v1", routes);

// Using custom error handling middleware to catch and process errors globally.
app.use(errorMiddleware);

// Exporting the app for use in other parts of the application, such as the server setup.
export default app;
