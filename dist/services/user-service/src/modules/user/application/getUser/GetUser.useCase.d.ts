import { IUser } from '../../domain/interfaces/IUser';
import { IUserService } from '../../domain/service/IUser.service';
export declare class GetUserUseCase {
    private readonly userService;
    constructor(userService: IUserService);
    run(id: IUser['id']): Promise<IUser>;
}
