import { IUserService } from "../../domain/service/IUser.service";
import { IUser, IUserCreate } from "../../domain/interfaces/IUser";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
export declare class UserService implements IUserService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    create(userDto: IUserCreate): Promise<IUser>;
    get(id: IUser["id"]): Promise<IUser>;
}
