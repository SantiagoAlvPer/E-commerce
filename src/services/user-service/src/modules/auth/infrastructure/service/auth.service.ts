import { Injectable, NotFoundException } from "@nestjs/common";
import { IAuthService } from "../../domain/service/IAuth.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "../entity/auth.entity";
import { Repository } from "typeorm";
import { IAuth } from "../../domain/interfaces/IAuth";

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>
  ) {}

  async validateUser(email: string): Promise<IAuth> {
    try {
    } catch (error) {
      console.log("error", error);
    }

    const auth = await this.authRepository.findOne({
      where: { email },
      relations: ["user"],
    });

    if (!auth) {
      throw new NotFoundException(`Auth record not found for email: ${email}`);
    }

    return auth;
  }
}