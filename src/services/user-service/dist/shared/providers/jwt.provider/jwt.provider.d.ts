import { JwtService } from "@nestjs/jwt";
import { IJwtService } from "../../../src/modules/auth/domain/service/IJwt.service";
export declare class JwtProvider implements IJwtService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    signToken(payload: Record<string, any>): string;
    verifyToken(token: string): Record<string, any>;
}
