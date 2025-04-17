"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserUseCase = void 0;
const rxjs_1 = require("rxjs");
const InternalServerError_1 = require("../../../../common/domain/errors/InternalServerError");
class AuthUserUseCase {
    authService;
    jwtService;
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async run(auth) {
        const userAuth = await this.authService.validateUser(auth.email);
        if (!userAuth) {
            throw new rxjs_1.NotFoundError("User not found");
        }
        let token = "";
        try {
            token = this.jwtService.signToken({
                id: userAuth.id,
            });
        }
        catch (error) {
            throw new InternalServerError_1.InternalServerError("Error generating token");
        }
        return {
            access_token: `Bearer ${token}`,
        };
    }
}
exports.AuthUserUseCase = AuthUserUseCase;
//# sourceMappingURL=AuthUser.useCase.js.map