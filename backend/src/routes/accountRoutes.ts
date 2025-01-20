import express from "express";

import { getBalance, transferBalance } from "../controllers/accountController";
const router = express.Router();

router.get("/balance", getBalance);

router.post("/transfer", transferBalance);

export default router;
