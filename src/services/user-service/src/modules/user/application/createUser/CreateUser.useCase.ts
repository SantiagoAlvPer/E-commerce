import { IUser, IUserCreate } from "../../domain/interfaces/IUser";
import { IUserService } from "../../domain/service/IUser.service";

export class CreateUserUseCase {
  constructor(
    private readonly userService: IUserService,
  ) {}

  async run(data: IUserCreate): Promise<IUser> {
    const newUser = await this.userService.create(data);
    console.log(newUser);

    return newUser;
  }
}
