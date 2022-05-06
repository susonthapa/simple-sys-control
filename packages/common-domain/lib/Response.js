"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
var success = function (_a) {
    var _b = _a.message, message = _b === void 0 ? 'Success' : _b, data = _a.data;
    return {
        code: 200,
        message: message,
        data: data,
    };
};
exports.success = success;
var failure = function (_a) {
    var _b = _a.message, message = _b === void 0 ? 'Failure' : _b, _c = _a.code, code = _c === void 0 ? 500 : _c;
    return {
        code: code,
        message: message,
    };
};
exports.failure = failure;
