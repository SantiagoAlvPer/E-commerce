"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = exports.Public = exports.IS_PUBLIC_KEY = void 0;
const keys_1 = require("../../../../../../common/constants/keys");
const ForbiddenError_1 = require("../../../../../common/domain/errors/ForbiddenError");
const common_1 = require("@nestjs/common");
const jwt_provider_1 = require("../../../../../../../../../../Corregir/E-commerce SLM/src/shared/providers/jwt.provider/jwt.provider");
exports.IS_PUBLIC_KEY = "isPublic";
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;
let JwtAuthGuard = class JwtAuthGuard {
    jwtProvider;
    constructor(jwtProvider) {
        this.jwtProvider = jwtProvider;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.getHeadersFromRequest(request);
        try {
            const payload = this.jwtProvider.verifyToken(token);
            request[keys_1.KEYS.USER] = payload;
        }
        catch (error) {
            throw new ForbiddenError_1.ForbiddenError("Token not provide");
        }
        return true;
    }
    getHeadersFromRequest(request) {
        const [_, token] = request.headers?.authorization?.split(" ") ?? [];
        if (!token) {
            throw new ForbiddenError_1.ForbiddenError("Token not provide");
        }
        return token;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_provider_1.JwtProvider])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map