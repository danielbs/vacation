import express from "express";

// Define an interface RequestWithBody<T> that extends express.Request
interface RequestWithBody<T> extends express.Request {
    body: T; // Specify the body property with type T
}

export default RequestWithBody;
