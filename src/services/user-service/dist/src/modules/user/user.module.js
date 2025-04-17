"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./infrastructure/controller/user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./infrastructure/entity/user.entity");
const user_service_1 = require("./infrastructure/service/user.service");
const GetUser_useCase_1 = require("./application/getUser/GetUser.useCase");
const CreateUser_useCase_1 = require("./application/createUser/CreateUser.useCase");
const auth_module_1 = require("../auth/auth.module");
const jwt_auth_guard_1 = require("../auth/infrastructure/guard/jwt/jwt-auth.guard");
const jwt_provider_1 = require("../../../shared/providers/jwt.provider/jwt.provider");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        providers: [
            {
                provide: "UserService",
                useClass: user_service_1.UserService,
            },
            {
                provide: "CreateUserUseCase",
                useFactory: (userService) => new CreateUser_useCase_1.CreateUserUseCase(userService),
                inject: ["UserService"],
            },
            {
                provide: "GetUserUseCase",
                useFactory: (userService) => new GetUser_useCase_1.GetUserUseCase(userService),
                inject: ["UserService"],
            },
            jwt_auth_guard_1.JwtAuthGuard,
            jwt_provider_1.JwtProvider,
        ],
        exports: [typeorm_1.TypeOrmModule, "UserService"],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map