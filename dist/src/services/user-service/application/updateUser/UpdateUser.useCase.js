"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUseCase = void 0;
const rxjs_1 = require("rxjs");
class UpdateUserUseCase {
    userService;
    hashProvider;
    constructor(userService, hashProvider) {
        this.userService = userService;
        this.hashProvider = hashProvider;
    }
    async run(id, userUpdateDto) {
        const user = await this.userService.get(id);
        if (!user) {
            throw new rxjs_1.NotFoundError('Error user not found');
        }
        if (userUpdateDto?.auth?.password) {
            userUpdateDto.auth.password = this.hashProvider.encrypt(userUpdateDto.auth.password);
        }
        await this.userService.update(id, userUpdateDto);
        return true;
    }
}
exports.UpdateUserUseCase = UpdateUserUseCase;
//# sourceMappingURL=UpdateUser.useCase.js.map