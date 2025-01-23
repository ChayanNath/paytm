"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggedInUser = exports.getAllUsers = exports.updateUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName } = req.body;
    if (!firstName && !lastName) {
        return res
            .status(400)
            .json({ message: "Please provide first name or last name" });
    }
    const user = req.user;
    if (!user || !user.id) {
        return res.status(403).json({ message: "You are not authenticated" });
    }
    try {
        yield User_1.default.updateOne({ _id: user.id }, { firstName, lastName });
        return res.status(200).json({ message: "User updated successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.updateUser = updateUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter } = req.query;
        const users = yield User_1.default.find(filter
            ? {
                $or: [
                    {
                        firstName: {
                            $regex: filter,
                            $options: "i",
                        },
                    },
                    {
                        lastName: {
                            $regex: filter,
                            $options: "i",
                        },
                    },
                ],
            }
            : {}).select("_id firstName lastName email");
        return res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getAllUsers = getAllUsers;
const getLoggedInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user || !req.user.id) {
            return res.status(403).json({ message: "You are not authenticated" });
        }
        const user = yield User_1.default.findById(req.user.id);
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getLoggedInUser = getLoggedInUser;
