"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDB = connectToMongoDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function connectToMongoDB() {
    try {
        console.log("🔌 Attempting to connect to MongoDB...");
        const uri = process.env.MONGO_URI;
        await mongoose_1.default.connect(uri);
        console.log("✅ Connected to MongoDB");
    }
    catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
}
//# sourceMappingURL=mongodb.config.js.map