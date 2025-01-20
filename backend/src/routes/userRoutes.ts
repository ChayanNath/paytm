import express from "express";
import { updateUser, getAllUsers } from "../controllers/userController";

const router = express.Router();

router.put("/", updateUser);

router.get("/bulk", getAllUsers);

export default router;
