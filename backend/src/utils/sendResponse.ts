import { Response } from "express";

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data?: T;
}

const sendResponse=<T>(
    res:Response,
    payload:IResponse<T>
)=>{
    const {
  statusCode,
  success,
  message,
  meta,
  data,
} = payload;

    return res.status(statusCode).json({
  success,
  message,
  meta,
  data,
});
};
export default sendResponse;