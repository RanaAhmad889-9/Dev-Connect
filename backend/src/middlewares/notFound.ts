import { NextFunction, Response, Request } from "express";
import AppError from "../utils/AppError";

const notFound = (
    req:Request,
    _res:Response,
    next:NextFunction
)=>{
    next(
        new AppError(
            404,
            `Route not found - ${req.originalUrl}`
        )
    )
};

export default notFound;