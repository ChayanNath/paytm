import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoURI as string, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDb", error);
    process.exit(1);
  }
};

export default connectDB;
