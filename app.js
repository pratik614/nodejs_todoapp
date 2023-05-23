import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";


const app = express();
app.use(cookieParser());
config({
    path:"./data/config.env",
});

app.use(express.json());     //middleware to get or access json data 


//using routes
app.use("/api/v1/task",taskRouter);    //make sure 
app.use("/api/v1/users",userRouter);

app.use(errorMiddleware);     //using error middleware 
app.use(cors({                  //since frontend and backend has different url cors is the middleware by which they go along 
origin:[process.env.FRONTEND_URL],
methods:["GET","POST","PUT","DELETE"],
credentials:true                    //send cookies to the frontend when true
}));            
export default app;

  