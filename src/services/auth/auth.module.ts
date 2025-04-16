import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { IAuthService } from "./domain/service/IAuth.service";
import { IJwtService } from "./domain/service/IJwt.service";
import { AuthUserUseCase } from "./application/authUser/AuthUser.useCase";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Auth } from "./infrastructure/entity/auth.entity";
import { AuthController } from "./infrastructure/controller/auth.controller";
import { AuthService } from "./infrastructure/service/auth.service";
import { HashProvider } from "../../shared/providers/hash.provider/hash.provider";
import { JwtProvider } from "../../shared/providers/jwt.provider/jwt.provider";
import { IHashProvider } from "../../common/domain/services/IHash.service";

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Auth]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
    }),
  ],
  providers: [
    {
      provide: "IHashProvider",
      useClass: HashProvider,
    },
    {
      provide: "IAuthService",
      useClass: AuthService,
    },
    {
      provide: "IJwtService",
      useClass: JwtProvider,
    },
    {
      provide: "AuthUserUseCase",
      useFactory: (
        hashProvider: IHashProvider,
        authService: IAuthService,
        jwtProvider: IJwtService
      ) => new AuthUserUseCase(hashProvider, authService, jwtProvider),
      inject: ["IHashProvider", "IAuthService", "IJwtService"],
    },
    JwtProvider,
  ],
  exports: ["IJwtService", JwtModule, JwtProvider],
})
export class AuthModule {}
