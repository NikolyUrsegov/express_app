"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const settings_1 = require("./settings");
const controller_1 = require("./videos/controller");
const db_1 = require("./db/db");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.get(settings_1.SETTINGS.PATH.ROOT, (_, res) => {
    res.status(200).json({ version: '1.0' });
});
exports.app.delete(settings_1.SETTINGS.PATH.CLEAR_ALL_DATA, (_, res) => {
    db_1.db.clear();
    res.status(204);
});
exports.app.use(settings_1.SETTINGS.PATH.VIDEOS, controller_1.videosRouter);
