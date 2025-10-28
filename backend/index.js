import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Define application
const app = express();

// Middleware
app.use(cors());
dotenv.config();

// Define constants
let port = process.env.PORT;

try {
    connectDB();

    app.listen(port, ()=> {
        console.log(`Server running on port ${port}`);
    })
} catch (error) {
    console.log("Error : " + error.message);
}


