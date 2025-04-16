import { IAuthService } from "../../domain/service/IAuth.service";
import { AuthDto } from "../../infrastructure/dtos/auth.dto";
import { IAccessToken } from "../../domain/interfaces/IAccessToken";
import { IJwtService } from "../../domain/service/IJwt.service";
import { IHashProvider } from "../../../../common/domain/services/IHash.service";
export declare class AuthUserUseCase {
    private readonly hashProvider;
    private readonly authService;
    private readonly jwtService;
    constructor(hashProvider: IHashProvider, authService: IAuthService, jwtService: IJwtService);
    run(auth: AuthDto): Promise<IAccessToken>;
}
