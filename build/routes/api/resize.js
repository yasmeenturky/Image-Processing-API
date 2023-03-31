"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const resizeImage_1 = __importDefault(require("../../utils/resizeImage"));
const resize = express_1.default.Router();
resize.get('/', (req, res) => {
    const fileName = req.query.fileName;
    const filePath = `./assets/${req.query.fileName}.jpg`;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    //check for missing query parameters
    if (!fileName && !width && !height) {
        return res.send('Query Parameters Are Missing');
    }
    if (!width) {
        return res.send('Query Parameter Width is Missing');
    }
    if (!height) {
        return res.send('Query Parameter Height is Missing');
    }
    if (!(0, fs_1.existsSync)(`./assets/${fileName}.jpg`)) {
        return res.send('Image Not Found');
    }
    //checks if the image exists with the required size in the resized folder
    if ((0, fs_1.existsSync)(`./assets/resized/${fileName}-${width}-${height}.jpg`)) {
        return res.sendFile(path_1.default.resolve(`./assets/resized/${fileName}-${width}-${height}.jpg`));
    }
    //if the image required size is not found resize the image and save it
    else {
        (0, resizeImage_1.default)(filePath, width, height, fileName);
        setTimeout(function () {
            return res.sendFile(path_1.default.resolve(`./assets/resized/${fileName}-${width}-${height}.jpg`));
        }, 1000);
    }
});
exports.default = resize;
