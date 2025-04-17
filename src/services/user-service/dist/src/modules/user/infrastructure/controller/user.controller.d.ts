import { HttpStatus } from "@nestjs/common";
import { GetUserUseCase } from "../../application/getUser/GetUser.useCase";
import { CreateUserUseCase } from "../../application/createUser/CreateUser.useCase";
import { UserDto } from "../dtos/user.dto";
import { KafkaProducerService } from "../../../../../shared/kafka/service/kafka.service";
export declare class UserController {
    private readonly getuserUseCase;
    private readonly createUserUseCase;
    private readonly kafkaProducer;
    constructor(getuserUseCase: GetUserUseCase, createUserUseCase: CreateUserUseCase, kafkaProducer: KafkaProducerService);
    getUser(request: Request): Promise<{
        code: HttpStatus;
        data: import("../../domain/interfaces/IUser").IUser;
        message: string;
        status: boolean;
        timestamp: string;
    }>;
    createUser(UserDto: UserDto): Promise<{
        code: HttpStatus;
        data: import("../../domain/interfaces/IUser").IUser;
        message: string;
        status: boolean;
        timestamp: string;
    }>;
}
