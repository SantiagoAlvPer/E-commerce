"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const CustomError_1 = require("./CustomError");
class NotFoundError extends CustomError_1.CustomError {
    constructor(message) {
        super(400, message ?? 'Resource not found');
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=NotFoundErrors.js.map