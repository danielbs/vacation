import { AxiosError } from "axios"; // Importing AxiosError type from axios

// Interface defining the structure of the API response
interface ApiResponse {
    status?: { msg: string }[]; // Optional array of status messages
    message: string; // Main error message
}

// Function to parse API errors
function parseApiError(error: AxiosError): string[] {
    const result: string[] = []; // Array to store error messages
    const responseData = error.response?.data as ApiResponse; // Extracting response data from Axios error

    // Pushing the main error message to the result array
    result.push(responseData.message);

    // Mapping through the array of status messages (if present) and pushing each message to the result array
    responseData?.status?.map((item) => {
        result.push(`${item.msg}`);
    });

    return result; // Returning the array of error messages
}

export default parseApiError; // Exporting the parseApiError function
