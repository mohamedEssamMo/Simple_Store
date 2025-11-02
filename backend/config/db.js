import mongoose from "mongoose";



export const connectDB = async () =>{
  try {
    mongoose.connect(process.env.Mongo_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error in DB connection", error);
    process.exit(1);
  }
}
