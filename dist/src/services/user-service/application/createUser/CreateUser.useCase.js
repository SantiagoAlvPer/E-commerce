"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
class CreateUserUseCase {
    userService;
    hashProvider;
    constructor(userService, hashProvider) {
        this.userService = userService;
        this.hashProvider = hashProvider;
    }
    async run(data) {
        const newPassowrd = this.hashProvider.encrypt(data.auth.password);
        data.auth.password = newPassowrd;
        const newUser = await this.userService.create(data);
        console.log(newUser);
        return newUser;
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
//# sourceMappingURL=CreateUser.useCase.js.map