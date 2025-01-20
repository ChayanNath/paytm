"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(403).json({ message: "You are not authenticated" });
        }
        const token = authHeader.split(" ")[1];
        const decodedData = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        req.user = decodedData;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "You are not authenticated" });
    }
};
exports.default = authMiddleware;
