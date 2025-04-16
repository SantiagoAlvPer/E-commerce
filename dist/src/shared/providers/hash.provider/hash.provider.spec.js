"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const hash_provider_1 = require("./hash.provider");
describe('HashProvider', () => {
    let provider;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [hash_provider_1.HashProvider],
        }).compile();
        provider = module.get(hash_provider_1.HashProvider);
    });
    it('should be defined', () => {
        expect(provider).toBeDefined();
    });
});
//# sourceMappingURL=hash.provider.spec.js.map