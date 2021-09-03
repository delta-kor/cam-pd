"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor(port) {
        this.port = port;
        this.application = (0, express_1.default)();
    }
    start() {
        this.application.listen(this.port, () => console.log(`Server started in port ${this.port}`));
    }
}
exports.default = App;
