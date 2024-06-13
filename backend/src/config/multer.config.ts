import multer from "multer"; // Importing multer for file upload handling
import path from "node:path"; // Importing path module for working with file paths
import { v4 as uuidv4 } from 'uuid'; // Importing uuid for generating unique filenames

// Configuring multer storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => { // Destination directory for uploaded files
        cb(null, path.join(__dirname, "..", "..", "uploads")); // Setting destination path
    },
    filename: (req, file, cb) => { // Custom filename generation for uploaded files
        const uniqueSuffix = uuidv4(); // Generating a unique identifier using UUID v4
        cb(null, `${uniqueSuffix}${file.originalname}`); // Combining unique identifier with original filename
    }
});

// Creating multer middleware instance with configured storage options
export const upload = multer({ storage: storage });
