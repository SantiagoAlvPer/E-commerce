import { IAuth, IAuthCreate } from "../../../auth/domain/interfaces/IAuth";
export interface IUser {
    id: number;
    name: string;
    lastname: string;
    phone: number;
    auth: IAuth;
}
export interface IUserCreate extends Omit<IUser, "id" | "auth"> {
    auth: IAuthCreate;
}
export interface IUserDto extends Omit<IUser, "id" | "appointments"> {
}
