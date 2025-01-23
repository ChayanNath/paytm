import express from "express";
import {
  updateUser,
  getAllUsers,
  getLoggedInUser,
} from "../controllers/userController";

const router = express.Router();

router.put("/", updateUser);

router.get("/bulk", getAllUsers);

router.get("/me", getLoggedInUser);

export default router;
