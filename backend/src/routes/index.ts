import { Router } from "express"; // Importing the Router from Express
import authRoutes from "./auth.routes"; // Importing authentication routes
import vacationRoutes from "./vacation.routes"; // Importing vacation routes

const routes = Router(); // Creating an instance of Router

// Mounting the authentication routes under the "/auth" endpoint
routes.use("/auth", authRoutes);

// Mounting the vacation routes under the "/vacation" endpoint
routes.use("/vacation", vacationRoutes);

export default routes; // Exporting the routes
