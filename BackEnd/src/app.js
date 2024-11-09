import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: 'http://localhost:5173', // Use the specific origin, not '*'
    credentials: true               // Allow cookies to be sent
  }));
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extends:true}))
app.use(express.static("public"))


//routes import

import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js'


//routes declaration

app.use("/api/v1/user",userRouter)
app.use("/api/v1/post",postRouter)


export { app }