"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.put("/", userController_1.updateUser);
router.get("/bulk", userController_1.getAllUsers);
router.get("/me", userController_1.getLoggedInUser);
exports.default = router;
