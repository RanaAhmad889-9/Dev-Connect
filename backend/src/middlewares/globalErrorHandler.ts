import { NextFunction,Response, Request } from "express";
import { env } from "../config/env";
import { IAppError } from "../interfaces/error.types";

const globalErrorHandler=(
    err:IAppError,
    _req:Request,
    res:Response,
    _next:NextFunction
)=>{
    const statusCode=err.statusCode || 500;

    return res.status(statusCode).json({
        success:false,
        message:err.message || "Internal Server Error",
        stack: env.NODE_ENV === "development"
        ? err.stack
        : undefined,
    })
}
export default globalErrorHandler;
