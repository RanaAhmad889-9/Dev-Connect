import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import notFound from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHandler";

import router from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/',(_req,res)=>{
    res.status(200).json({
        success: true,
    message: "Server running",
    })
});

app.use("/api/v1", router);

app.use(notFound);


app.use(globalErrorHandler);


export default app;
