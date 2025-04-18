"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDB = connectToMongoDB;
const mongoose_1 = require("mongoose");
async function connectToMongoDB() {
    try {
        const uri = process.env.MONGO_URI;
        await mongoose_1.default.connect(uri, {});
        console.log('✅ Connected to MongoDB');
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
}
//# sourceMappingURL=mongodb.config.js.map