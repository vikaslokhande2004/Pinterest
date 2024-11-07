import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extends:true}))
app.use(express.static("public"))


//routes import

import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js'


//routes declaration

app.use("/api/v1/user",userRouter)
app.use("/api/v1/post",postRouter)


export { app }