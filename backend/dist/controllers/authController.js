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
exports.signin = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const Account_1 = __importDefault(require("../models/Account"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName } = req.body;
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = new User_1.default({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });
        yield user.save();
        const balance = Math.floor(Math.random() * 4000 + 1000);
        const account = new Account_1.default({ userId: user._id, balance });
        yield account.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        const allUsers = yield User_1.default.find();
        console.log(allUsers);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordMatches = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email, id: user._id }, config_1.JWT_SECRET, {
            expiresIn: "1h",
        });
        return res
            .status(200)
            .json({ token, message: "User signed in successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.signin = signin;
