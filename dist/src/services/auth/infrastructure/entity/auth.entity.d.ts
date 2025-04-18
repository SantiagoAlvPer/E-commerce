import { IAuth } from "../../../auth/domain/interfaces/IAuth";
import { IUser } from "../../../user-service/domain/interfaces/IUser";
export declare class Auth implements IAuth {
    id: number;
    email: string;
    password: string;
    user: IUser;
}
