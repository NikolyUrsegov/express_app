"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdNumber = exports.createDateToIsoString = exports.videoInputAdditionalChecksValidate = exports.videoInputValidate = void 0;
const types_1 = require("./types");
const videoInputValidate = (video, additionalChecks) => {
    const errors = {
        errorsMessages: [],
    };
    if (!video.title?.length) {
        errors.errorsMessages.push({
            message: 'title is required',
            field: 'title',
        });
    }
    if (!video.author?.length) {
        errors.errorsMessages.push({
            message: 'author is required',
            field: 'author',
        });
    }
    if (!video.availableResolutions?.some((p) => Object.values(types_1.AvailableResolutions).includes(p))) {
        errors.errorsMessages.push({
            message: 'error!!!!',
            field: 'availableResolution',
        });
    }
    return additionalChecks ? additionalChecks(video, errors) : errors;
};
exports.videoInputValidate = videoInputValidate;
const videoInputAdditionalChecksValidate = (video, errors) => {
    if (typeof video.canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({
            message: 'error',
            field: 'canBeDownloaded',
        });
    }
    if (typeof video.minAgeRestriction !== 'number' && video.minAgeRestriction !== null) {
        errors.errorsMessages.push({
            message: 'error',
            field: 'minAgeRestriction',
        });
    }
    if (typeof video.publicationDate !== 'string') {
        errors.errorsMessages.push({
            message: 'error',
            field: 'publicationDate',
        });
    }
    return errors;
};
exports.videoInputAdditionalChecksValidate = videoInputAdditionalChecksValidate;
const createDateToIsoString = () => {
    const nowDate = new Date();
    return nowDate.toISOString();
};
exports.createDateToIsoString = createDateToIsoString;
const createIdNumber = () => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
};
exports.createIdNumber = createIdNumber;
