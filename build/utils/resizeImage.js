"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const resizeImage = (filePath, width, height, fileName) => {
    (0, sharp_1.default)(filePath)
        .resize(width, height, {
        fit: 'contain',
        position: 'center',
    })
        .toFile(`./assets/resized/${fileName}-${width}-${height}.jpg`) //saves resized image to assets/resized folder
        .then(() => {
        console.log('resized');
    });
};
exports.default = resizeImage;
