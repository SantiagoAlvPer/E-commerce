"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const CustomError_1 = require("./CustomError");
class ForbiddenError extends CustomError_1.CustomError {
    constructor(message) {
        super(403, message ?? 'Credentials not valid');
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=ForbiddenError.js.map