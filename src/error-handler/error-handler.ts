import { Request, Response, NextFunction } from "express";
import ServerError from "./server-error";

const ErrorHandler = (error: Error, request: Request, response: Response, next: NextFunction): void => {

    if (error instanceof ServerError) {

        response.status(error.httpCode).send(error.message);
        return ;

    }
    
    else if (error.name == "TypeError") {

        response.status(401).send("Invalid url, please make sure to add http/https in the beginning of the url");

    }

    response.status(500).send("Something went wrong");

}

export default ErrorHandler;    