import { Request, Response, NextFunction } from "express";
import { ErrorsApi } from "../helpers/errors";



export const MiddlewareErrors = (req: Request, res: Response, next: NextFunction, error: Error & Partial<ErrorsApi>) =>{
   const statusCode = error.statusCode ?? 500;

   const message = error.statusCode ? error.message : "Internal Server Error."

   return res.status(statusCode).json({message});
}