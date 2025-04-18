"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseAdapter = void 0;
class ResponseAdapter {
    static set(code, data, message, status = false) {
        return {
            code,
            data,
            message,
            status,
            timestamp: new Date().toISOString(),
        };
    }
}
exports.ResponseAdapter = ResponseAdapter;
//# sourceMappingURL=response.adapter.js.map