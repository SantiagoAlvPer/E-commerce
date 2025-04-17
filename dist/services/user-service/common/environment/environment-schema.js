"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentSchema = void 0;
const Joi = __importStar(require("joi"));
exports.environmentSchema = Joi.object({
    NODE_ENV: Joi.string().valid('dev', 'qa', 'production').required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_PORT: Joi.number().port().default(3306).required(),
    DATABASE_DIALECT: Joi.string().required(),
    DATABASE_HOST: Joi.string().required(),
    MIGRATION_TABLE: Joi.string().required(),
    JWT_EXPIRE_TTL: Joi.number().required(),
    JWT_EXPIRE_REFRESH: Joi.number().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    MAIL_NOTIFIER: Joi.string().email().required(),
    MAIL_PASSWORD: Joi.string().required(),
    MAIL_FROM: Joi.string().required(),
    MAIL_HOST: Joi.string().required(),
    MAIL_PORT: Joi.number().required(),
    REDIS_PASSWORD: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    REDIS_DATABASES: Joi.number().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_USERNAME: Joi.string().required(),
});
//# sourceMappingURL=environment-schema.js.map