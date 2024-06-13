import { User, UserRole } from "../entity/user.entity"; // Importing the User entity and UserRole enum.
import { Repository } from "typeorm"; // Importing the Repository class from TypeORM.
import { AppDataSource } from "../config/db.config"; // Importing the data source configuration.
import { UserDto, UserLoginDto, UserRegisterDto } from "../dto/user.login.dto"; // Importing DTOs for user login and registration.
import ApiError from "../exceptions/api.error.exception"; // Importing custom error handling class.
import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library for creating and verifying tokens.
import bcrypt from "bcrypt"; // Importing the bcrypt library for hashing passwords.
import dotenv from "dotenv"; // Importing dotenv to load environment variables.
import { UserJwtPayload } from "../interfaces/RequestWithUser.interface"; // Importing an interface for JWT payload.

dotenv.config(); // Configuring dotenv to read environment variables from a .env file.

class AuthService {
    // Initializing a user repository using TypeORM's data source configuration.
    userRepository: Repository<User> = AppDataSource.getRepository(User);

    // Method to handle user login.
    async login(user: UserLoginDto) {
        const { email, password } = user; // Destructuring email and password from the user DTO.
        const candidate = await this.userRepository.findOneBy({ email }); // Finding a user by email.
        if (!candidate) { // If no user is found, throw an unauthorized error.
            throw ApiError.UnauthorizedError();
        }
        // Comparing the provided password with the stored hashed password.
        const isEqualPassword = await bcrypt.compare(password, candidate.password!);
        if (!isEqualPassword) { // If passwords do not match, throw an unauthorized error.
            throw ApiError.UnauthorizedError();
        }
        // Create an access token for the authenticated user.
        const accessToken = await this.createAccessToken(candidate.id, candidate.role);
        return new UserDto(accessToken, candidate); // Return a DTO containing the access token and user details.
    }

    // Method to handle user registration.
    async register(user: UserRegisterDto) {
        const candidate = await this.userRepository.findOneBy({ email: user.email }); // Check if a user with the provided email already exists.
        if (candidate) { // If a user is found, throw a conflict error.
            throw ApiError.ConflictError();
        }
        // Hash the user's password before saving.
        const hashPassword = await this.createHashPassword(user.password);
        // Save the new user to the repository with the hashed password.
        const newUser = await this.userRepository.save({ ...user, password: hashPassword });
        // Create an access token for the newly registered user.
        const accessToken = await this.createAccessToken(newUser.id, newUser.role);
        return new UserDto(accessToken, newUser); // Return a DTO containing the access token and user details.
    }

    // Method to refresh the access token using a refresh token.
    async refresh(refreshToken: string | undefined) {
        if (!refreshToken) { // If no refresh token is provided, throw an unauthorized error.
            throw ApiError.UnauthorizedError();
        }
        // Validate the refresh token.
        const userData = this.validateRefreshToken(refreshToken);
        if (!userData) { // If the token is invalid, throw an unauthorized error.
            throw ApiError.UnauthorizedError();
        }
        // Find the user by the ID encoded in the refresh token.
        const user = await this.userRepository.findOneBy({ id: userData.userId });
        if (!user) { // If no user is found, throw an unauthorized error.
            throw ApiError.UnauthorizedError();
        }
        // Create a new access token for the user.
        const accessToken = await this.createAccessToken(user.id, user.role);
        return {
            accessToken,
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                id: user.id,
                role: user.role,
            },
        }; // Return the new access token and user details.
    }

    // Method to create an access token for a user.
    async createAccessToken(userId: number | undefined, userRole: UserRole | undefined) {
        return jwt.sign({ userId: userId, role: userRole }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '7d' }); // Sign a JWT with a 7-day expiration.
    }

    // Method to create a refresh token for a user.
    async createRefreshToken(userId: number | undefined, userRole: UserRole | undefined) {
        return jwt.sign({ userId: userId, role: userRole }, process.env.JWT_REFRESH_TOKEN!, { expiresIn: "30d" }); // Sign a JWT with a 30-day expiration.
    }

    // Method to hash a user's password.
    async createHashPassword(password: string) {
        return bcrypt.hash(password, 12); // Hash the password with a salt rounds value of 12.
    }

    // Method to validate an access token.
    validateAccessToken(token: string): UserJwtPayload | null {
        try {
            return <UserJwtPayload>jwt.verify(token, process.env.JWT_ACCESS_SECRET!); // Verify the JWT and return the payload if valid.
        } catch (e) {
            return null; // Return null if the token is invalid.
        }
    }

    // Method to validate a refresh token.
    validateRefreshToken(token: string): UserJwtPayload | null {
        try {
            return <UserJwtPayload>jwt.verify(token, process.env.JWT_REFRESH_TOKEN!); // Verify the JWT and return the payload if valid.
        } catch (e) {
            return null; // Return null if the token is invalid.
        }
    }
}

export default AuthService; // Exporting the AuthService class for use in other parts of the application.
