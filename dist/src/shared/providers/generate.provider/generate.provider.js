"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateCVV = exports.GenerateAccNumber = void 0;
const common_1 = require("@nestjs/common");
let GenerateAccNumber = class GenerateAccNumber {
    accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
};
exports.GenerateAccNumber = GenerateAccNumber;
exports.GenerateAccNumber = GenerateAccNumber = __decorate([
    (0, common_1.Injectable)()
], GenerateAccNumber);
class GenerateCVV {
}
exports.GenerateCVV = GenerateCVV;
//# sourceMappingURL=generate.provider.js.map