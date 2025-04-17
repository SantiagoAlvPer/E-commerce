import { IUserCreate } from "../../domain/interfaces/IUser";
import { IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { AuthDto } from "src/modules/auth/infrastructure/dtos/auth.dto";
import { IAuthCreate } from "src/modules/auth/domain/interfaces/IAuth";

export class UserDto implements IUserCreate {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsInt()
  phone: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AuthDto)
  auth: IAuthCreate;
}
