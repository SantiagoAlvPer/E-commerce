"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const CustomError_1 = require("./CustomError");
class BadRequestError extends CustomError_1.CustomError {
    constructor(message) {
        super(400, message ?? 'Record was found');
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=BadRequestError.js.map