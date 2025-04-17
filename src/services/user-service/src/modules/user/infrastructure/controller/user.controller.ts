import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { GetUserUseCase } from "../../application/getUser/GetUser.useCase";
import { ResponseAdapter } from "./../../../../../common/response-adapter/response.adapter";
import { CreateUserUseCase } from "../../application/createUser/CreateUser.useCase";
import { UserDto } from "../dtos/user.dto";
import { HTTP_RESPONSE_MESSAGE } from "../../../../../common/constants/http-message";
import { JwtAuthGuard } from "../../../auth/infrastructure/guard/jwt/jwt-auth.guard";
import { ITokenPayload } from "../../../auth/infrastructure/interfaces/IToken";
import { KEYS } from "../../../../../common/constants/keys";
import { KafkaProducerService } from "../../../../../shared/kafka/service/kafka.service";

@Controller("user")
export class UserController {
  constructor(
    @Inject("GetUserUseCase")
    private readonly getuserUseCase: GetUserUseCase,
    @Inject("CreateUserUseCase")
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly kafkaProducer: KafkaProducerService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getUser(@Req() request: Request) {
    const auth: ITokenPayload = request[KEYS.USER] as ITokenPayload;
    console.log("ID extraído del token:", auth.id);
    return ResponseAdapter.set(
      HttpStatus.OK,
      await this.getuserUseCase.run(auth.id),
      HTTP_RESPONSE_MESSAGE.HTTP_200_OK,
      true
    );
  }

  @Post()
  public async createUser(@Body() UserDto: UserDto) {
    const newUser = await this.createUserUseCase.run(UserDto);

    await this.kafkaProducer.emit("user.created", newUser);

    return ResponseAdapter.set(
      HttpStatus.CREATED,
      newUser,
      HTTP_RESPONSE_MESSAGE.HTTP_201_CREATED,
      true
    );
  }
}
