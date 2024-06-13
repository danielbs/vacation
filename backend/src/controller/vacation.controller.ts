import { NextFunction, Request, Response } from "express";
import RequestWithBody from "../interfaces/RequstWithBody.interface";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/api.error.exception";
import VacationService from "../services/vacation.service";
import { CreateVacationDTO } from "../dto/vacation.dto";
import RequestWithUser from "../interfaces/RequestWithUser.interface";
import { stringify } from "csv-stringify";

class AuthController {
    private readonly vacationService: VacationService;

    constructor() {
        this.vacationService = new VacationService();
    }

    // Method for handling the GET request to retrieve all vacations
    getAll = async (req: Request, res: Response, next: NextFunction) => { // Arrow function expression for the getAll method
        try { // Handling any potential errors that may occur during execution of the method
            // Retrieving vacation data with followers count from the VacationService
            const data = await this.vacationService.getVacationsWithFollowersCount();
            // Constructing the full URL of the request
            const fullUrl = req.protocol + '://' + req.get('host') + "/";
            // Extracting user ID from the request object
            const userId = (req as RequestWithUser).user.userId;
            // Extracting query parameters for filtering vacations
            const follow = req.query.follow === 'true';
            const upcoming = req.query.upcoming === 'true';
            const active = req.query.active === 'true';
            // Extracting pagination parameters
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const offset = (page - 1) * limit;
            // Retrieving vacations based on filter criteria and pagination
            const vacations = await this.vacationService.getAllVacations(
                fullUrl,
                userId,
                follow,
                upcoming,
                active,
                limit,
                offset
            );
            // Sending JSON response with vacation data, pagination information, and total records
            return res.json({
                results: vacations.data,
                page,
                limit,
                totalRecords: vacations.total
            });
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }

    // Method for retrieving statistics about vacations
    getVacationStats = async (req: Request, res: Response, next: NextFunction) => { // Arrow function expression for the getVacationStats method
        try { // Handling any potential errors that may occur during execution of the method
            // Retrieving vacation statistics from the VacationService
            const stats = await this.vacationService.getVacationsWithFollowersCount();
            // Sending JSON response with vacation statistics
            return res.json(stats);
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }

    // Method for retrieving a single vacation by ID
    getOne = async (req: Request, res: Response, next: NextFunction) => { // Arrow function expression for the getOne method
        const { id } = req.params; // Extracting vacation ID from request parameters
        try { // Handling any potential errors that may occur during execution of the method
            // Retrieving the vacation by ID from the VacationService
            const vacation = await this.vacationService.getVacationById(+id);
            // Sending JSON response with the retrieved vacation data
            return res.json(vacation);
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }

    // Method for creating a new vacation
    create = async (req: RequestWithBody<CreateVacationDTO>, res: Response, next: NextFunction) => { // Arrow function expression for the create method
        try { // Handling any potential errors that may occur during execution of the method
            const errors = validationResult(req); // Validating request body using express-validator
            if (!errors.isEmpty()) { // Checking if there are validation errors
                throw ApiError.BadRequest("error", errors.array()); // Throwing a BadRequest error with validation errors
            }
            if (!req.file) { // Checking if picture is included in the request
                throw ApiError.BadRequest("Picture is required"); // Throwing a BadRequest error if picture is missing
            }
            const picture = req.file.filename; // Extracting filename of the uploaded picture
            // Creating a new vacation using VacationService and request body data
            const vacation = await this.vacationService.createVacation({ ...req.body, picture });
            // Sending JSON response with the created vacation data
            return res.status(201).json(vacation);
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }


    // Method for updating an existing vacation
    update = async (req: RequestWithBody<Partial<CreateVacationDTO>>, res: Response, next: NextFunction) => { // Arrow function expression for the update method
        const { id } = req.params; // Extracting vacation ID from request parameters
        try { // Handling any potential errors that may occur during execution of the method
            const errors = validationResult(req); // Validating request body using express-validator
            if (!errors.isEmpty()) { // Checking if there are validation errors
                throw ApiError.BadRequest("error", errors.array()); // Throwing a BadRequest error with validation errors
            }
            const picture = req.file?.filename; // Extracting filename of the uploaded picture (if available)
            // Updating the vacation using VacationService, vacation ID, and request body data
            const vacation = await this.vacationService.updateVacation(id, { ...req.body, picture });
            // Sending JSON response with the updated vacation data
            return res.json(vacation);
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }

    // Method for deleting a vacation
    delete = async (req: Request, res: Response, next: NextFunction) => { // Arrow function expression for the delete method
        try { // Handling any potential errors that may occur during execution of the method
            const id = req.params.id; // Extracting vacation ID from request parameters
            // Deleting the vacation using VacationService and the extracted ID
            const vacation = await this.vacationService.deleteVacation(id);
            // Sending JSON response with the deleted vacation data and HTTP status 200 (OK)
            return res.status(200).json(vacation);
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }
    // Method for allowing a user to follow a vacation
    followVacation = async (req: Request, res: Response, next: NextFunction) => { // Arrow function expression for the followVacation method
        const { vacationId } = req.params; // Extracting vacation ID from request parameters
        const userId = (req as RequestWithUser).user.userId; // Extracting user ID from request with user data
        try { // Handling any potential errors that may occur during execution of the method
            // Following the vacation using VacationService, user ID, and vacation ID
            const follower = await this.vacationService.followToVacation(userId, +vacationId);
            // Sending JSON response with the follower data and HTTP status 201 (Created)
            return res.status(201).json(follower);
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }

    // Method for allowing a user to unfollow a vacation
    unfollowVacation = async (req: Request, res: Response, next: NextFunction) => { // Arrow function expression for the unfollowVacation method
        const { vacationId } = req.params; // Extracting vacation ID from request parameters
        const userId = (req as RequestWithUser).user.userId; // Extracting user ID from request with user data
        try { // Handling any potential errors that may occur during execution of the method
            // Unfollowing the vacation using VacationService, user ID, and vacation ID
            const follower = await this.vacationService.unfollowFromVacation(userId, +vacationId);
            // Sending JSON response with the follower data and HTTP status 200 (OK)
            return res.status(200).json(follower);
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }
    // Method for generating and sending a CSV file containing vacation data
    getCsvFile = async (req: Request, res: Response, next: NextFunction) => { // Arrow function expression for the getCsvFile method
        try { // Handling any potential errors that may occur during execution of the method
            // Retrieving vacation data with followers count from the VacationService
            const parsedData = await this.vacationService.getVacationsWithFollowersCount();
            // Mapping vacation data to the CSV format
            const data = parsedData.map((item) => ({
                Destination: item.destination,
                Followers: item.followersCount,
            }));
            // Setting response headers for CSV file download
            res.header('Content-Type', 'text/csv');
            res.header('Content-Disposition', 'attachment; filename="filename.csv"');
            // Converting JSON data to CSV format and streaming it as response
            stringify(data, { header: true }).pipe(res);
        } catch (e) { // Catching and handling any errors that occur during execution
            next(e); // Passing the error to the Express error handling middleware
        }
    }


}

export default AuthController;