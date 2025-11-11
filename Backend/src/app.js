import express from "express"
export const app = express()
import cors from 'cors'
import cookieParser from "cookie-parser"

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json)
app.use(express.static("Public"))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())