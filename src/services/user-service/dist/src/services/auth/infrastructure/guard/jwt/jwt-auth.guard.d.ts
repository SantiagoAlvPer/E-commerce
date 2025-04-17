import { Request } from "express";
import { JwtProvider } from "../../../../../shared/providers/jwt.provider/jwt.provider";
import { ExecutionContext } from "@nestjs/common";
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare class JwtAuthGuard {
    private readonly jwtProvider;
    constructor(jwtProvider: JwtProvider);
    canActivate(context: ExecutionContext): boolean;
    getHeadersFromRequest(request: Request): string;
}
