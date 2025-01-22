import User from "../models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { JWT_SECRET } from "../config";
import Account from "../models/Account";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await user.save();

    const balance = Math.floor(Math.random() * 4000 + 1000);

    const account = new Account({ userId: user._id, balance });
    await account.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const allUsers = await User.find();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatches = await bcryptjs.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ token, message: "User signed in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
