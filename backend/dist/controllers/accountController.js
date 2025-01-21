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
exports.transferBalance = exports.getBalance = void 0;
const Account_1 = __importDefault(require("../models/Account"));
const mongoose_1 = __importDefault(require("mongoose"));
const getBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const account = yield Account_1.default.findOne({ userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.status(200).json({ balance: account.balance });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getBalance = getBalance;
const transferBalance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const session = yield mongoose_1.default.startSession(); // Start a session
    session.startTransaction(); // Start the transaction
    try {
        const fromId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!fromId) {
            yield session.abortTransaction();
            return res.status(401).json({ message: "Unauthorized" });
        }
        const { toId, amount } = req.body;
        if (!toId || !amount) {
            yield session.abortTransaction();
            return res.status(400).json({ message: "Invalid request" });
        }
        if (fromId === toId) {
            yield session.abortTransaction();
            return res.status(400).json({ message: "Cannot transfer to self" });
        }
        const fromAccount = yield Account_1.default.findOne({
            userId: fromId,
        }).session(session);
        const toAccount = yield Account_1.default.findOne({ userId: toId }).session(session);
        if (!fromAccount || !toAccount) {
            yield session.abortTransaction();
            return res.status(404).json({ message: "Account not found" });
        }
        if (fromAccount.balance < amount) {
            yield session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }
        fromAccount.balance -= amount;
        toAccount.balance += amount;
        yield fromAccount.save({ session });
        yield toAccount.save({ session });
        yield session.commitTransaction();
        session.endSession();
        return res.status(200).json({ message: "Transfer successful" });
    }
    catch (error) {
        console.error(error);
        yield session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.transferBalance = transferBalance;
