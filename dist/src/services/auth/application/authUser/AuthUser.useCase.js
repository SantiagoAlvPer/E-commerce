"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserUseCase = void 0;
const rxjs_1 = require("rxjs");
const ForbiddenError_1 = require("../../../../common/domain/errors/ForbiddenError");
const InternalServerError_1 = require("../../../../common/domain/errors/InternalServerError");
class AuthUserUseCase {
    hashProvider;
    authService;
    jwtService;
    constructor(hashProvider, authService, jwtService) {
        this.hashProvider = hashProvider;
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async run(auth) {
        const userAuth = await this.authService.validateUser(auth.email);
        if (!userAuth) {
            throw new rxjs_1.NotFoundError("User not found");
        }
        const isValidPassword = this.hashProvider.compare(auth.password, userAuth.password);
        if (!isValidPassword) {
            throw new ForbiddenError_1.ForbiddenError("Password mismatch");
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