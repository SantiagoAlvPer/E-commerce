import {
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { IUserService } from "../../domain/service/IUser.service";
import { IUser, IUserCreate } from "../../domain/interfaces/IUser";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(userDto: IUserCreate): Promise<IUser> {
    let user: User | undefined;
    console.log(user);

    const existingUser = await this.userRepository.findOne({
      where: { auth: { email: userDto.auth.email } },
      relations: ["auth"],
    });

    if (existingUser) {
      throw new ConflictException(
        "El usuario con este correo ya está registrado."
      );
    }

    try {
      user = this.userRepository.create(userDto);
    } catch (error) {
      throw new RequestTimeoutException("Cannot create user", {
        description: "Error creating user",
      });
    }

    const token = this.jwtService.sign({ id: user.id, email: user.auth.email });
    console.log(token);
    await this.userRepository.save(user);

    return user;
  }

  async get(id: IUser["id"]): Promise<IUser> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: { auth: true },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      throw new RequestTimeoutException("Error querying user");
    }
  }
}
