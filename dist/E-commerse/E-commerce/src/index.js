"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./shared/mongo/database");
const express_1 = require("express");
const dotenv_1 = require("dotenv");
const cart_routes_1 = require("./controllers/routes/cart.routes");
const kafkaClient_1 = require("./shared/kafka/kafkaClient");
const cart_consumer_1 = require("./shared/events/consumers/cart.consumer");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
app.use(express_1.default.json());
app.use(cart_routes_1.default);
const testKafkaConnection = async () => {
    const producer = kafkaClient_1.kafka.producer();
    try {
        await producer.connect();
        console.log('✅ Conectado a Kafka correctamente');
        await producer.disconnect();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('❌ Error al conectar a Kafka:', error.message);
        }
        else {
            console.error('❌ Error al conectar a Kafka:', error);
        }
    }
};
const startServer = async () => {
    try {
        console.log('🔌 Conectando a la base de datos...');
        await (0, database_1.default)();
        console.log('✅ Conexión exitosa a MongoDB');
        await testKafkaConnection();
        await (0, cart_consumer_1.startCartConsumer)();
        console.log('🎧 Consumidor de Kafka iniciado');
        app.listen(PORT, () => {
            console.log(`🚀 Cart service escuchando en http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map