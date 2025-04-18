import { HttpStatus } from "@nestjs/common";
import { GetUserUseCase } from "../../application/getUser/GetUser.useCase";
import { CreateUserUseCase } from "../../application/createUser/CreateUser.useCase";
import { UserDto } from "../dtos/user.dto";
export declare class UserController {
    private readonly getuserUseCase;
    private readonly createUserUseCase;
    constructor(getuserUseCase: GetUserUseCase, createUserUseCase: CreateUserUseCase);
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
