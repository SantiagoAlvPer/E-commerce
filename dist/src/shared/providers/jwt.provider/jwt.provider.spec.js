"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const jwt_provider_1 = require("./jwt.provider");
const jwt_1 = require("@nestjs/jwt");
describe('JwtProvider', () => {
    let provider;
    let jwtService;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [jwt_provider_1.JwtProvider, jwt_1.JwtService],
        }).compile();
        provider = module.get(jwt_provider_1.JwtProvider);
        jwtService = module.get(jwt_1.JwtService);
    });
    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
//# sourceMappingURL=jwt.provider.spec.js.map