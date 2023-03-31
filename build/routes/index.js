"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("./api/resize"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send('main api');
});
routes.use('/resize', resize_1.default);
exports.default = routes;
