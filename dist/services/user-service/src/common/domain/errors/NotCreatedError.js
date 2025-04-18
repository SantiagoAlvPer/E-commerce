"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotCreatedError = void 0;
const CustomError_1 = require("./CustomError");
class NotCreatedError extends CustomError_1.CustomError {
    constructor(message) {
        super(422, message ?? 'Error creating resource');
    }
}
exports.NotCreatedError = NotCreatedError;
//# sourceMappingURL=NotCreatedError.js.map