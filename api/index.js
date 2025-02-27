import express from 'express'
import dotenv from "dotenv"
import mongoose from 'mongoose';
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express()
dotenv.config();
const port = 8080

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to database")
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("Database disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("Database connected")
})

// Middlewares
// app.use(cors())
const corsOption = {
    origin : "http://localhost:3000",
    credentials : true,
}
app.use(cors(corsOption))
app.use(cookieParser())
app.use(express.json())


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);


app.listen(port, () => {
    connect();
    console.log("Listening on port 8080")
})