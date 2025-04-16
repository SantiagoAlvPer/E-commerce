import { HttpStatus } from "@nestjs/common";
import { AuthUserUseCase } from "../../application/authUser/AuthUser.useCase";
import { AuthDto } from "../dtos/auth.dto";
export declare class AuthController {
    private readonly authUSerUseCase;
    constructor(authUSerUseCase: AuthUserUseCase);
    login(authDto: AuthDto): Promise<{
        code: HttpStatus;
        data: import("../../domain/interfaces/IAccessToken").IAccessToken;
        message: string;
        status: boolean;
        timestamp: string;
    }>;
}
