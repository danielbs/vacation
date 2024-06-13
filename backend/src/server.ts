// Importing the data source configuration to manage the database connection.
import {AppDataSource} from "./config/db.config";

// Importing the Express application instance.
import app from "./app";

// Importing dotenv to manage environment variables.
import dotenv from "dotenv";

// Importing the http module to create an HTTP server.
import http from "http";

// Importing the User entity and UserRole enum which likely define the user model and role constants.
import {User, UserRole} from "./entity/user.entity";

// Setting the port for the server to listen on. It checks for a PORT environment variable; if not set, it defaults to 5000.
const PORT = process.env.PORT || 5000;

// Configuring dotenv to read the .env file and load environment variables.
dotenv.config();

// Creating an HTTP server that uses the Express app for handling HTTP requests.
const httpServer = http.createServer(app);

// Immediately invoked asynchronous function expression to handle the async operations needed for server setup.
;(async () => {
    try {
        // Attempting to initialize the database connection using TypeORM's data source configuration.
        await AppDataSource.initialize();

        // Once the database is initialized, start the HTTP server on the specified port.
        httpServer.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`) // Logging to the console that the server is successfully listening.
        });
    } catch (e) {
        // If there is an error during initialization, log the error to the console.
        console.error(e);
    }
})();

// Adding an event listener for the 'SIGTERM' signal, which is typically sent to terminate a process gracefully.
process.on("SIGTERM", () => {
    console.log("Received SIGTERM signal. Shutting down gracefully...");
    process.exit(0); // Exits the process with a success code (0), indicating that the shutdown was intentional and without error.
});
