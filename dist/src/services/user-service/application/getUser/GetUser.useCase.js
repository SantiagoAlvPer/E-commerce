"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserUseCase = void 0;
const rxjs_1 = require("rxjs");
class GetUserUseCase {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async run(id) {
        const user = await this.userService.get(id);
        if (!user) {
            throw new rxjs_1.NotFoundError('User not found');
        }
        return user;
    }
}
exports.GetUserUseCase = GetUserUseCase;
//# sourceMappingURL=GetUser.useCase.js.map