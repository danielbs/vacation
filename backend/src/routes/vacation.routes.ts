import { Router } from "express"; // Importing the Router from Express
import authMiddleware from "../middlewares/auth.middleware"; // Importing authentication middleware
import VacationController from "../controller/vacation.controller"; // Importing the VacationController
import roleMiddleware from "../middlewares/role.middleware"; // Importing role-based access control middleware
import { UserRole } from "../entity/user.entity"; // Importing user roles
import { createVacationValidator } from "../dto/vacation.dto"; // Importing validator for vacation creation

const vacationRoutes = Router(); // Creating an instance of Router
const vacationController = new VacationController(); // Creating an instance of VacationController

// Route to get all vacations
vacationRoutes.get("/", authMiddleware, vacationController.getAll);

// Route to get a specific vacation by ID (accessible only to admin users)
vacationRoutes.get("/:id", authMiddleware, roleMiddleware(UserRole.ADMIN), vacationController.getOne);

// Route to get vacation statistics (accessible only to admin users)
vacationRoutes.post("/stats/", authMiddleware, roleMiddleware(UserRole.ADMIN), vacationController.getVacationStats);

// Route to download vacation data as a CSV file (accessible only to admin users)
vacationRoutes.post("/download-csv", authMiddleware, roleMiddleware(UserRole.ADMIN), vacationController.getCsvFile);

// Route to create a new vacation (accessible only to admin users, with validation)
vacationRoutes.post("/create", authMiddleware, roleMiddleware(UserRole.ADMIN), createVacationValidator, vacationController.create);

// Route to update an existing vacation (accessible only to admin users, with validation)
vacationRoutes.patch("/update/:id", authMiddleware, roleMiddleware(UserRole.ADMIN), createVacationValidator, vacationController.update);

// Route to delete a vacation (accessible only to admin users)
vacationRoutes.delete("/delete/:id", authMiddleware, roleMiddleware(UserRole.ADMIN), vacationController.delete);

// Route to follow a vacation (accessible to authenticated users)
vacationRoutes.post("/follow-vacation/:vacationId", authMiddleware, vacationController.followVacation);

// Route to unfollow a vacation (accessible to authenticated users)
vacationRoutes.delete("/unfollow-vacation/:vacationId", authMiddleware, vacationController.unfollowVacation);

export default vacationRoutes; // Exporting the vacationRoutes
