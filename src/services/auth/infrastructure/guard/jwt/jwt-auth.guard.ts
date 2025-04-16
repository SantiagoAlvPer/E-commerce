import { Request } from "express";
import { KEYS } from "../../../../../../common/constants/keys";
import { JwtProvider } from "../../../../../shared/providers/jwt.provider/jwt.provider";
import { ForbiddenError } from "../../../../../common/domain/errors/ForbiddenError";
import { ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class JwtAuthGuard {
  constructor(private readonly jwtProvider: JwtProvider) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.getHeadersFromRequest(request);
    try {
      const payload = this.jwtProvider.verifyToken(token);
      request[KEYS.USER] = payload;
    } catch (error) {
      throw new ForbiddenError("Token not provide");
    }
    return true;
  }

  getHeadersFromRequest(request: Request): string {
    const [_, token] = request.headers?.authorization?.split(" ") ?? [];
    if (!token) {
      throw new ForbiddenError("Token not provide");
    }
    return token;
  }
}
