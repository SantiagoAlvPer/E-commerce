"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = require("dotenv");
const notification_controller_1 = require("./controllers/notification.controller");
const kafka_consumer_1 = require("./services/kafka.consumer");
const mongodb_config_1 = require("./config/mongodb.config");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3003;
app.use(express_1.default.json());
app.use('/api/notifications', notification_controller_1.default);
app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});
(0, kafka_consumer_1.startKafkaConsumer)().catch(console.error);
(0, mongodb_config_1.connectToMongoDB)();
//# sourceMappingURL=index.js.map