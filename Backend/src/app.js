import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectToSocket from "./Controller/socketManager.js";


const app = express();
export const server = createServer(app);
const io = connectToSocket(server);

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json({ limit: "40kb" }));
app.use(express.static("Public"));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use(cookieParser());

import router from "./Routes/userRoutes.js";

app.use("/api/v1/users", router)

