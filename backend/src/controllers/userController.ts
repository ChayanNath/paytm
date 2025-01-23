import { Request, Response } from "express";
import User from "../models/User";

export const updateUser = async (req: Request, res: Response): Promise<any> => {
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
    await User.updateOne({ _id: user.id }, { firstName, lastName });
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { filter } = req.query;
    const users = await User.find(
      filter
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
        : {}
    ).select("_id firstName lastName email");

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getLoggedInUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(403).json({ message: "You are not authenticated" });
    }
    const user = await User.findById(req.user.id);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
