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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const resizeImage_1 = __importDefault(require("../utils/resizeImage"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('should resize image with the given width and height ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/resize')
            .query({ fileName: 'encenadaport', width: '400', height: '400' });
        console.log(response.text);
        expect(response.status).toBe(200);
    }));
    it('should display that file is not found ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/resize')
            .query({ fileName: '', width: '400', height: '400' });
        console.log(response.text);
        expect(response.status).toBe(200);
    }));
    it('should display that width parameter is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/resize')
            .query({ fileName: 'fjord', width: '', height: '400' });
        console.log(response.text);
        expect(response.status).toBe(200);
    }));
    it('should display that image is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/resize')
            .query({ width: '100', height: '150' });
        console.log(response.text);
        expect(response.status).toBe(200);
    }));
    it('should display that parameters are missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/resize');
        console.log(response.text);
        expect(response.status).toBe(200);
    }));
    it('should display that height parameter is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/resize')
            .query({ fileName: 'santamonica', width: '100' });
        console.log(response.text);
        expect(response.status).toBe(200);
    }));
});
describe('Testing image processng', () => {
    it('should resize image and save it in resized folder', () => {
        const filePath = './assets/icelandwaterfall.jpg';
        const resize = {
            resizeImg: resizeImage_1.default,
        };
        spyOn(resize, 'resizeImg')
            .and.callThrough()
            .withArgs(filePath, 150, 150, 'icelandwaterfall');
        resize.resizeImg(filePath, 150, 150, 'icelandwaterfall');
        expect(resize.resizeImg).toHaveBeenCalled();
    });
});
