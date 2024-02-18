"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_JWT;
const authenticateMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            error: "Unauthorized"
        });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, secretKey);
        req.token = decode;
        next();
    }
    catch (e) {
        console.log(e);
        return res.status(401).json({
            message: "Unauthorized",
            error: e
        });
    }
};
exports.authenticateMiddleware = authenticateMiddleware;
