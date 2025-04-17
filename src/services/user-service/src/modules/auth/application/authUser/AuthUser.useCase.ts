import { IAuthService } from "../../domain/service/IAuth.service";
import { AuthDto } from "../../infrastructure/dtos/auth.dto";

import { IAccessToken } from "../../domain/interfaces/IAccessToken";
import { IAuth } from "../../domain/interfaces/IAuth";
import { NotFoundError } from "rxjs";
import { IJwtService } from "../../domain/service/IJwt.service";
import { ForbiddenError } from "../../../../common/domain/errors/ForbiddenError";
import { InternalServerError } from "../../../../common/domain/errors/InternalServerError";
import { IHashProvider } from "../../../../common/domain/services/IHash.service";

export class AuthUserUseCase {
  constructor(
    private readonly hashProvider: IHashProvider,
    private readonly authService: IAuthService,
    private readonly jwtService: IJwtService
  ) {}

  async run(auth: AuthDto): Promise<IAccessToken> {
    const userAuth: IAuth = await this.authService.validateUser(auth.email);
    if (!userAuth) {
      throw new NotFoundError("User not found");
    }
    const isValidPassword = this.hashProvider.compare(
      auth.password,
      userAuth.password
    );
    if (!isValidPassword) {
      throw new ForbiddenError("Password mismatch");
    }
    let token: string = "";
    try {
      token = this.jwtService.signToken({
        id: userAuth.id,
      });
    } catch (error) {
      throw new InternalServerError("Error generating token");
    }
    return {
      access_token: `Bearer ${token}`,
    };
  }
}
