import { IHashProvider } from 'src/common/domain/services/IHash.service';
import { IUserService } from '../../domain/service/IUser.service';
import { IUser, IUserUpdate } from '../../domain/interfaces/IUser';
export declare class UpdateUserUseCase {
    private readonly userService;
    private readonly hashProvider;
    constructor(userService: IUserService, hashProvider: IHashProvider);
    run(id: IUser['id'], userUpdateDto: IUserUpdate): Promise<boolean>;
}
