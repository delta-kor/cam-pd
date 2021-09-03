"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const utils_1 = __importDefault(require("utils"));
const UserSchmea = new mongoose_1.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: () => utils_1.default.generateUuid(8),
    },
    nickname: { type: String, required: true },
    ip: { type: Array, required: true, default: [] },
});
const UserModel = (0, mongoose_1.model)('User', UserSchmea);
exports.default = UserModel;
