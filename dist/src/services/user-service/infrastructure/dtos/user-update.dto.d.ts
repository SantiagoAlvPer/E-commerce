import { UserDto } from "./user.dto";
import { IAuthUpdateDto } from "src/services/auth/domain/interfaces/IAuth";
declare const UserUpdateDto_base: import("@nestjs/mapped-types").MappedType<Partial<Omit<UserDto, "auth">>>;
export declare class UserUpdateDto extends UserUpdateDto_base {
    auth: IAuthUpdateDto;
}
export {};
