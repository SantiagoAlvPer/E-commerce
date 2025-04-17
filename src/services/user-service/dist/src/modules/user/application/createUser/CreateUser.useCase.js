"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
class CreateUserUseCase {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async run(data) {
        const newUser = await this.userService.create(data);
        console.log(newUser);
        return newUser;
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=CreateUser.useCase.js.map