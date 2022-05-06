"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failure = exports.success = void 0;
const success = ({ message = 'Success', data }) => {
    return {
        code: 200,
        message: message,
        data: data,
    };
};
exports.success = success;
const failure = ({ message = 'Failure', code = 500 }) => {
    return {
        code: code,
        message: message,
    };
};
exports.failure = failure;
