import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/config";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import authMiddleware from "./middleware/authMiddleware";
import userRoutes from "./routes/userRoutes";
import accountRoutes from "./routes/accountRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1", authRoutes);

app.use("/api/v1/user", authMiddleware, userRoutes);

app.use("/api/v1/account", authMiddleware, accountRoutes);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
