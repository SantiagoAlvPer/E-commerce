import { Request } from "express";
import { ExecutionContext } from "@nestjs/common";
import { JwtProvider } from "../../../../../../../../../../Corregir/E-commerce SLM/src/shared/providers/jwt.provider/jwt.provider";
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare class JwtAuthGuard {
    private readonly jwtProvider;
    constructor(jwtProvider: JwtProvider);
    canActivate(context: ExecutionContext): boolean;
    getHeadersFromRequest(request: Request): string;
}
