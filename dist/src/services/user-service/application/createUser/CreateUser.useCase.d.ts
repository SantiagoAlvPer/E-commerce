import { IHashProvider } from "../../../../common/domain/services/IHash.service";
import { IUser, IUserCreate } from "../../domain/interfaces/IUser";
import { IUserService } from "../../domain/service/IUser.service";
export declare class CreateUserUseCase {
    private readonly userService;
    private readonly hashProvider;
    constructor(userService: IUserService, hashProvider: IHashProvider);
    run(data: IUserCreate): Promise<IUser>;
}
