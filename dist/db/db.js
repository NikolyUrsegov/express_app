"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.db = {
    videos: {},
    setDB(dataset) {
        const { videos } = dataset ?? {};
        if (videos) {
            this.videos = videos;
            return;
        }
    },
    clear() {
        this.videos = {};
    },
};
