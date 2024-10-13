"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeResponsesEnum = void 0;
var CodeResponsesEnum;
(function (CodeResponsesEnum) {
    CodeResponsesEnum[CodeResponsesEnum["OK"] = 200] = "OK";
    CodeResponsesEnum[CodeResponsesEnum["CREATED"] = 201] = "CREATED";
    CodeResponsesEnum[CodeResponsesEnum["NO_CONTENT"] = 204] = "NO_CONTENT";
    CodeResponsesEnum[CodeResponsesEnum["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    CodeResponsesEnum[CodeResponsesEnum["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    CodeResponsesEnum[CodeResponsesEnum["FORBIDDEN"] = 403] = "FORBIDDEN";
    CodeResponsesEnum[CodeResponsesEnum["NOT_FOUND"] = 404] = "NOT_FOUND";
    CodeResponsesEnum[CodeResponsesEnum["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(CodeResponsesEnum || (exports.CodeResponsesEnum = CodeResponsesEnum = {}));
