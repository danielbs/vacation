import { Request } from "express";

// Define RequestWithCookies extending Request and specifying cookies property
interface RequestWithCookies extends Request {
    cookies: any;
}

export default RequestWithCookies;
