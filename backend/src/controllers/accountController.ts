import { Request, Response } from "express";
import Account from "../models/Account";
import mongoose from "mongoose";

export const getBalance = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const account = await Account.findOne({ userId });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({ balance: account.balance });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const transferBalance = async (
  req: Request,
  res: Response
): Promise<any> => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Start the transaction

  try {
    const fromId = req.user?.id;
    if (!fromId) {
      await session.abortTransaction();
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { toId, amount } = req.body;
    if (!toId || !amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid request" });
    }

    if (fromId === toId) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Cannot transfer to self" });
    }

    const fromAccount = await Account.findOne({
      userId: fromId,
    }).session(session);

    const toAccount = await Account.findOne({ userId: toId }).session(session);

    if (!fromAccount || !toAccount) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Account not found" });
    }

    if (fromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Insufficient balance" });
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await fromAccount.save({ session });
    await toAccount.save({ session });

    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ message: "Transfer successful" });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: "Something went wrong" });
  }
};
