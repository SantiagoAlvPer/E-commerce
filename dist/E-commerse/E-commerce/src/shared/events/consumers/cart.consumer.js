"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCartConsumer = startCartConsumer;
const dotenv_1 = require("dotenv");
const database_1 = require("../../mongo/database");
const kafkaClient_1 = require("../../kafka/kafkaClient");
const cartEvent_model_1 = require("../../../models/cartEvent.model");
const cartItem_model_1 = require("../../../models/cartItem.model");
const axios_1 = require("axios");
const cartProdutc_model_1 = require("../../../models/cartProdutc.model");
dotenv_1.default.config();
const consumer = kafkaClient_1.kafka.consumer({
    groupId: process.env.KAFKA_GROUP_ID || "default-group",
});
async function startCartConsumer() {
    try {
        console.log("📡 Connecting to Kafka and MongoDB...");
        await (0, database_1.default)();
        await consumer.connect();
        console.log("✅ Kafka consumer connected");
        await consumer.subscribe({ topic: "cart-updates", fromBeginning: true });
        console.log("📨 Subscribed to topic: cart-updates");
        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat }) => {
                const rawValue = message.value?.toString();
                if (!rawValue)
                    return;
                try {
                    const eventData = JSON.parse(rawValue);
                    if (!eventData.payload || !eventData.snapshot) {
                        console.warn("⚠️ Evento inválido: faltan 'payload' o 'snapshot'. Evento ignorado.");
                        return;
                    }
                    if (typeof eventData.timestamp === "string") {
                        eventData.timestamp = new Date(eventData.timestamp);
                    }
                    const exists = await cartEvent_model_1.EventModel.findOne({ eventId: eventData.eventId });
                    if (exists) {
                        console.warn(`⚠️ Evento duplicado ignorado: ${eventData.eventId}`);
                        return;
                    }
                    try {
                        await cartEvent_model_1.EventModel.create(eventData);
                        console.log("✅ Evento guardado:", eventData.eventId);
                    }
                    catch (dbError) {
                        if (dbError.code === 11000) {
                            console.warn(`❗ Duplicado detectado al guardar evento en MongoDB - eventId: ${eventData.eventId}`);
                            console.warn("🧩 Detalles del duplicado:", dbError.keyValue);
                            return;
                        }
                        else {
                            throw dbError;
                        }
                    }
                    const productId = eventData.payload?.productId;
                    if (!productId) {
                        console.warn("⚠️ No se encontró productId en el evento");
                        return;
                    }
                    let product = await cartProdutc_model_1.ProductModel.findOne({ id: productId });
                    if (!product) {
                        const response = await axios_1.default.get(`https://fakestoreapi.com/products/${productId}`);
                        product = await cartProdutc_model_1.ProductModel.create(response.data);
                        console.log("✅ Producto guardado en la base de datos:", product.id);
                    }
                    const existingItem = await cartItem_model_1.CartItemModel.findOne({
                        productId: product.id,
                    });
                    if (existingItem) {
                        existingItem.quantity += 1;
                        await existingItem.save();
                        console.log("🔁 Cantidad actualizada en carrito para:", product.id);
                    }
                    else {
                        await cartItem_model_1.CartItemModel.create({
                            productId: product.id,
                            title: product.title,
                            price: product.price,
                            quantity: 1,
                            addedAt: new Date(),
                        });
                        console.log("🛒 Producto añadido al carrito:", product.id);
                    }
                    heartbeat();
                }
                catch (err) {
                    console.error("❌ Error al procesar el mensaje:", err);
                }
            },
        });
    }
    catch (err) {
        console.error("❌ Error al iniciar el consumidor:", err);
    }
}
//# sourceMappingURL=cart.consumer.js.map