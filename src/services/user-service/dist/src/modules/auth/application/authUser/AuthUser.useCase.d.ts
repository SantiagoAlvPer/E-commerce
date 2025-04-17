import { IAuthService } from "../../domain/service/IAuth.service";
import { AuthDto } from "../../infrastructure/dtos/auth.dto";
import { IAccessToken } from "../../domain/interfaces/IAccessToken";
import { IJwtService } from "../../domain/service/IJwt.service";
export declare class AuthUserUseCase {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: IAuthService, jwtService: IJwtService);
    run(auth: AuthDto): Promise<IAccessToken>;
}
