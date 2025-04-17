"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoundError = void 0;
const CustomError_1 = require("./CustomError");
class FoundError extends CustomError_1.CustomError {
    constructor(message) {
        super(302, message ?? 'Record was found');
    }
}
exports.FoundError = FoundError;
//# sourceMappingURL=FoundError.js.map