"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cartManagement';
        await mongoose_1.default.connect(mongoUri);
        console.log('Conexión a MongoDB exitosa');
        if (process.env.MONGOOSE_DEBUG === 'true') {
            mongoose_1.default.set('debug', true);
        }
    }
    catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=database.js.map