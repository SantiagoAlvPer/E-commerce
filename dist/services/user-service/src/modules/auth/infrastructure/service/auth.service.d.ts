import { IAuthService } from "../../domain/service/IAuth.service";
import { Auth } from "../entity/auth.entity";
import { Repository } from "typeorm";
import { IAuth } from "../../domain/interfaces/IAuth";
export declare class AuthService implements IAuthService {
    private readonly authRepository;
    constructor(authRepository: Repository<Auth>);
    validateUser(email: string): Promise<IAuth>;
}
