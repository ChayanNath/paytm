"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./db/config"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors_1 = __importDefault(require("cors"));
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1", authRoutes_1.default);
app.use("/api/v1/user", authMiddleware_1.default, userRoutes_1.default);
app.use("/api/v1/account", authMiddleware_1.default, accountRoutes_1.default);
(0, config_1.default)();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
