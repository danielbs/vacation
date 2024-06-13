import { check } from "express-validator";
import { upload } from "../config/multer.config";

// Validator middleware for creating a new vacation
export const createVacationValidator = [
    upload.single('picture'), // Handle picture upload
    check("destination").notEmpty().withMessage("Destination is required"), // Destination validation
    check("description").notEmpty().withMessage("Description is required"), // Description validation
    check("price")
        .notEmpty().withMessage("Price is required") // Price validation
        .isFloat({ min: 0, max: 10000 }).withMessage("Price must be between $0 and $10000"), // Price range validation
    check("start_date")
        .notEmpty().withMessage("Start date is required") // Start date validation
        .isDate().withMessage("Start date must be a valid date.") // Valid date format
        .isAfter(new Date().toISOString().split("T")[0]) // Start date not in the past
        .withMessage("Start date cannot be in the past"),
    check("end_date")
        .notEmpty().withMessage("End date is required") // End date validation
        .isDate().withMessage("End date must be a valid date.") // Valid date format
        .custom((value, { req }) => { // Custom validation to ensure end date is after start date
            if(new Date(value) <= new Date(req.body.start_date)) {
                throw new Error("End date must be after the start date.");
            }
            return true;
        }),
];

// Data transfer object (DTO) for creating a new vacation
export class CreateVacationDTO {
    destination: string;
    description: string;
    price: number;
    picture: string;
    start_date: Date;
    end_date: Date;
}
