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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const GetUser_useCase_1 = require("../../application/getUser/GetUser.useCase");
const response_adapter_1 = require("./../../../../../common/response-adapter/response.adapter");
const CreateUser_useCase_1 = require("../../application/createUser/CreateUser.useCase");
const user_dto_1 = require("../dtos/user.dto");
const http_message_1 = require("../../../../../common/constants/http-message");
const jwt_auth_guard_1 = require("../../../auth/infrastructure/guard/jwt/jwt-auth.guard");
const keys_1 = require("../../../../../common/constants/keys");
const kafka_service_1 = require("../../../../../../../shared/kafka/service/kafka.service");
let UserController = class UserController {
    getuserUseCase;
    createUserUseCase;
    kafkaProducer;
    constructor(getuserUseCase, createUserUseCase, kafkaProducer) {
        this.getuserUseCase = getuserUseCase;
        this.createUserUseCase = createUserUseCase;
        this.kafkaProducer = kafkaProducer;
    }
    async getUser(request) {
        const auth = request[keys_1.KEYS.USER];
        console.log("ID extraído del token:", auth.id);
        return response_adapter_1.ResponseAdapter.set(common_1.HttpStatus.OK, await this.getuserUseCase.run(auth.id), http_message_1.HTTP_RESPONSE_MESSAGE.HTTP_200_OK, true);
    }
    async createUser(UserDto) {
        const newUser = await this.createUserUseCase.run(UserDto);
        await this.kafkaProducer.emit("user.created", newUser);
        return response_adapter_1.ResponseAdapter.set(common_1.HttpStatus.CREATED, newUser, http_message_1.HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED, true);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    __param(0, (0, common_1.Inject)("GetUserUseCase")),
    __param(1, (0, common_1.Inject)("CreateUserUseCase")),
    __metadata("design:paramtypes", [GetUser_useCase_1.GetUserUseCase,
        CreateUser_useCase_1.CreateUserUseCase,
        kafka_service_1.KafkaProducerService])
], UserController);
//# sourceMappingURL=user.controller.js.map