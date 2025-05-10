import { IUser, IUserCreate } from "../../domain/interfaces/IUser";
import { IUserService } from "../../domain/service/IUser.service";
export declare class CreateUserUseCase {
    private readonly userService;
    constructor(userService: IUserService);
    run(data: IUserCreate): Promise<IUser>;
}
