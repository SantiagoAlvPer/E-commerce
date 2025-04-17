import { IAuth } from "../../domain/interfaces/IAuth";
import { IUser } from "../../../user/domain/interfaces/IUser";
export declare class Auth implements IAuth {
    id: number;
    email: string;
    password: string;
    user: IUser;
}
