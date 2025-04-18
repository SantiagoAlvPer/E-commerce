import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./infrastructure/controller/user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./infrastructure/entity/user.entity";
import { UserService } from "./infrastructure/service/user.service";
import { GetUserUseCase } from "./application/getUser/GetUser.useCase";
import { CreateUserUseCase } from "./application/createUser/CreateUser.useCase";
import { IUserService } from "./domain/service/IUser.service";
import { AuthModule } from "../auth/auth.module";
import { JwtAuthGuard } from "../auth/infrastructure/guard/jwt/jwt-auth.guard";
import { JwtProvider } from "../../../../../../../Corregir/E-commerce SLM/src/shared/providers/jwt.provider/jwt.provider";
import { KafkaModule } from "../../../../../../../Corregir/E-commerce SLM/src/shared/kafka/kafka.module";

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    KafkaModule
  ],
  providers: [
    {
      provide: "UserService",
      useClass: UserService,
    },
    {
      provide: "CreateUserUseCase",
      useFactory: (userService: IUserService) =>
        new CreateUserUseCase(userService),
      inject: ["UserService"],
    },
    {
      provide: "GetUserUseCase",
      useFactory: (userService: IUserService) =>
        new GetUserUseCase(userService),
      inject: ["UserService"],
    },
    JwtAuthGuard,
    JwtProvider,
  ],
  exports: [TypeOrmModule, "UserService"],
})
export class UserModule {}
