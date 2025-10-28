import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Importing env variables
const mongodb_uri = process.env.MONGODB_URL;

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(`${mongodb_uri}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error connecting to Database : " + error.message);
        process.exit(1);
    }
}

export default connectDB;