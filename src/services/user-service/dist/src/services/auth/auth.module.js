"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const AuthUser_useCase_1 = require("./application/authUser/AuthUser.useCase");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const auth_entity_1 = require("./infrastructure/entity/auth.entity");
const auth_controller_1 = require("./infrastructure/controller/auth.controller");
const auth_service_1 = require("./infrastructure/service/auth.service");
const hash_provider_1 = require("../../shared/providers/hash.provider/hash.provider");
const jwt_provider_1 = require("../../shared/providers/jwt.provider/jwt.provider");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([auth_entity_1.Auth]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get("JWT_SECRET"),
                    signOptions: { expiresIn: "1h" },
                }),
            }),
        ],
        providers: [
            {
                provide: "IHashProvider",
                useClass: hash_provider_1.HashProvider,
            },
            {
                provide: "IAuthService",
                useClass: auth_service_1.AuthService,
            },
            {
                provide: "IJwtService",
                useClass: jwt_provider_1.JwtProvider,
            },
            {
                provide: "AuthUserUseCase",
                useFactory: (hashProvider, authService, jwtProvider) => new AuthUser_useCase_1.AuthUserUseCase(hashProvider, authService, jwtProvider),
                inject: ["IHashProvider", "IAuthService", "IJwtService"],
            },
            jwt_provider_1.JwtProvider,
        ],
        exports: ["IJwtService", jwt_1.JwtModule, jwt_provider_1.JwtProvider],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map