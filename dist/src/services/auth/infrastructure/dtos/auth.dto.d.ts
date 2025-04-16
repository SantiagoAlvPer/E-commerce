import { IAuthCreate } from "../../domain/interfaces/IAuth";
export declare class AuthDto implements IAuthCreate {
    email: string;
    password: string;
}
