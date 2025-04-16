"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const notification_controller_1 = __importDefault(require("./controllers/notification.controller"));
const kafka_consumer_1 = require("./services/kafka.consumer");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3003;
app.use(express_1.default.json());
// ✅ Usa el router correctamente
app.use('/api/notifications', notification_controller_1.default);
app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
(0, kafka_consumer_1.startKafkaConsumer)().catch(console.error);
