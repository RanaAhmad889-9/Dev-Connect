import { AnyObjectSchema } from "yup";
import { Request, Response, NextFunction } from "express";

const validateRequest=(schema:AnyObjectSchema)=>async (req:Request, res:Response, next: NextFunction)=>{
    try{
        await schema.validate(
            {
                body:req.body,
            },
            {
                abortEarly:false,
            }
        );
        next();
    }catch(error:any){
        res.status(400).json({
             success: false,
        message: "Validation Error",
        errors: error.errors,
        })
    }
}
export default validateRequest;