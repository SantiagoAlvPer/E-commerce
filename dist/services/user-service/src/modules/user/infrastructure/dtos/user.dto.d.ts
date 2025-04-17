import { IUserCreate } from "../../domain/interfaces/IUser";
import { IAuthCreate } from "../../../auth/domain/interfaces/IAuth";
export declare class UserDto implements IUserCreate {
    name: string;
    lastname: string;
    phone: number;
    auth: IAuthCreate;
}
