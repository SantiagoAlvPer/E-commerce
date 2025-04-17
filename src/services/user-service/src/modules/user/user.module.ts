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
import { HashProvider } from "../../../../../shared/providers/hash.provider/hash.provider";
import { JwtProvider } from "../../../../../shared/providers/jwt.provider/jwt.provider";
import { IHashProvider } from "src/common/domain/services/IHash.service";

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule), // 🔹 Usa forwardRef aquí también
  ],
  providers: [
    {
      provide: "UserService",
      useClass: UserService,
    },
    {
      provide: "HashProvider",
      useClass: HashProvider,
    },
    {
      provide: "CreateUserUseCase",
      useFactory: (userService: IUserService, hashProvider: IHashProvider) =>
        new CreateUserUseCase(userService, hashProvider),
      inject: ["UserService", "HashProvider"],
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
