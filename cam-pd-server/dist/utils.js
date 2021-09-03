"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class Utils {
    static generateUuid(length) {
        return crypto_1.default.randomBytes(length / 2).toString('hex');
    }
}
exports.default = Utils;
