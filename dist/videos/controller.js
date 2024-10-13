"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const helpers_1 = require("./helpers");
const constants_1 = require("../common/constants");
exports.videosRouter = (0, express_1.Router)();
const videosControllers = {
    get: (_, res) => {
        res.status(constants_1.CodeResponsesEnum.OK).json(Object.values(db_1.db.videos));
    },
    post: (req, res) => {
        const { errorsMessages } = (0, helpers_1.videoInputValidate)(req.body);
        if (errorsMessages.length) {
            res.status(constants_1.CodeResponsesEnum.BAD_REQUEST).json({ errorsMessages });
            return;
        }
        const nowDate = (0, helpers_1.createDateToIsoString)();
        const newVideo = {
            ...req.body,
            id: (0, helpers_1.createIdNumber)(),
            createdAt: nowDate,
            publicationDate: nowDate,
            canBeDownloaded: false,
            minAgeRestriction: null,
        };
        db_1.db.videos = { ...db_1.db.videos, [newVideo.id]: newVideo };
        res.status(201).json(newVideo);
    },
    getVideo: (req, res) => {
        const { id } = req.params;
        const videoId = Number(id);
        if (isNaN(videoId)) {
            res.status(constants_1.CodeResponsesEnum.NOT_FOUND);
            return;
        }
        const video = db_1.db.videos[videoId];
        if (!video) {
            res.status(404);
            return;
        }
        res.status(201).json(video);
    },
    putVideo: (req, res) => {
        const { id } = req.params;
        const videoId = Number(id);
        if (isNaN(videoId)) {
            res.status(404);
            return;
        }
        const { errorsMessages } = (0, helpers_1.videoInputValidate)(req.body);
        if (errorsMessages.length) {
            res.status(constants_1.CodeResponsesEnum.BAD_REQUEST).json({ errorsMessages });
            return;
        }
        const video = db_1.db.videos[videoId];
        if (!video) {
            res.status(constants_1.CodeResponsesEnum.NOT_FOUND);
            return;
        }
        db_1.db.videos[videoId] = req.body;
        res.status(constants_1.CodeResponsesEnum.NO_CONTENT);
    },
    deleteVideo: (req, res) => {
        const { id } = req.params;
        const videoId = Number(id);
        if (isNaN(videoId)) {
            res.status(constants_1.CodeResponsesEnum.NOT_FOUND);
            return;
        }
        const video = db_1.db.videos[videoId];
        if (!video) {
            res.status(constants_1.CodeResponsesEnum.NO_CONTENT);
            return;
        }
        delete db_1.db.videos[videoId];
        res.status(constants_1.CodeResponsesEnum.NO_CONTENT);
    },
};
exports.videosRouter.get('/', videosControllers.get);
exports.videosRouter.post('/', videosControllers.post);
exports.videosRouter.get('/:id', videosControllers.getVideo);
exports.videosRouter.put('/:id', videosControllers.putVideo);
exports.videosRouter.delete('/:id', videosControllers.getVideo);
