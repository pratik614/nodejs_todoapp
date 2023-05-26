import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";


const app = express();

config({
    path: "./data/config.env",
});
app.use(cors({                  //since frontend and backend has different url cors is the middleware by which they go along 
    origin: [FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true                    //send cookies to the frontend when true
}));
app.use(cookieParser());
app.use(express.json());     //middleware to get or access json data 


//using routes
app.use("/api/v1/task", taskRouter);    //make sure 
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
    res.send("working");
});

app.use(errorMiddleware);     //using error middleware 

export default app;

