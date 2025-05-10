import { IAuth } from "../../../auth/domain/interfaces/IAuth";
import { IUser } from "../../domain/interfaces/IUser";
export declare class User implements IUser {
    id: number;
    name: string;
    lastname: string;
    phone: number;
    auth: IAuth;
}
