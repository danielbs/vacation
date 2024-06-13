class ApiError extends Error {
    status: number;
    errors: any[];

    constructor(status: number, message: string, errors: any[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    // Static method to create an UnauthorizedError instance
    static UnauthorizedError() {
        return new ApiError(401, "User not authorized");
    }

    // Static method to create a ConflictError instance
    static ConflictError() {
        return new ApiError(409, "Conflict");
    }

    // Static method to create a BadRequest instance with custom message and errors
    static BadRequest(message: string, errors: any[] = []) {
        return new ApiError(400, message, errors);
    }

    // Static method to create a ForbiddenError instance
    static ForbiddenError() {
        return new ApiError(403, "Forbidden");
    }

    // Static method to create a NotFoundError instance
    static NotFoundError() {
        return new ApiError(404, "Not Found");
    }
}

export default ApiError;
