import { Product } from "./../../interfaces/product";
import dotenv from "dotenv";
import connectDB from "../../mongo/database";
import { kafka } from "../../kafka/kafkaClient";
import { EventModel } from "../../../models/cartEvent.model";
import { CartItemModel } from "../../../models/cartItem.model";
import axios from "axios";
import { ProductModel } from "../../../models/cartProdutc.model";

dotenv.config();

// Crear consumer
const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID || "default-group",
});

export async function startCartConsumer() {
  try {
    console.log("📡 Connecting to Kafka and MongoDB...");
    await connectDB();
    await consumer.connect();
    console.log("✅ Kafka consumer connected");

    await consumer.subscribe({ topic: "cart-updates", fromBeginning: true });
    console.log("📨 Subscribed to topic: cart-updates");

    await consumer.run({
      eachMessage: async ({ topic, partition, message, heartbeat }) => {
        const rawValue = message.value?.toString();
        if (!rawValue) return;

        try {
          const eventData = JSON.parse(rawValue);

          if (!eventData.payload || !eventData.snapshot) {
            console.warn("⚠️ Evento inválido: faltan 'payload' o 'snapshot'. Evento ignorado.");
            return;
          }

          if (typeof eventData.timestamp === "string") {
            eventData.timestamp = new Date(eventData.timestamp);
          }

          const exists = await EventModel.findOne({ eventId: eventData.eventId });
          if (exists) {
            console.warn(`⚠️ Evento duplicado ignorado: ${eventData.eventId}`);
            return;
          }

          try {
            await EventModel.create(eventData);
            console.log("✅ Evento guardado:", eventData.eventId);
          } catch (dbError: any) {
            if (dbError.code === 11000) {
              console.warn(`❗ Duplicado detectado al guardar evento en MongoDB - eventId: ${eventData.eventId}`);
              console.warn("🧩 Detalles del duplicado:", dbError.keyValue);
              return;
            } else {
              throw dbError;
            }
          }

          const productId = eventData.payload?.productId;
          if (!productId) {
            console.warn("⚠️ No se encontró productId en el evento");
            return;
          }

          let product = await ProductModel.findOne({ id: productId });
          if (!product) {
            const response = await axios.get<Product>(
              `https://fakestoreapi.com/products/${productId}`
            );
            product = await ProductModel.create(response.data);
            console.log("✅ Producto guardado en la base de datos:", product.id);
          }

          const existingItem = await CartItemModel.findOne({
            productId: product.id,
          });

          if (existingItem) {
            existingItem.quantity += 1;
            await existingItem.save();
            console.log("🔁 Cantidad actualizada en carrito para:", product.id);
          } else {
            await CartItemModel.create({
              productId: product.id,
              title: product.title,
              price: product.price,
              quantity: 1,
              addedAt: new Date(),
            });
            console.log("🛒 Producto añadido al carrito:", product.id);
          }

          heartbeat();

        } catch (err) {
          console.error("❌ Error al procesar el mensaje:", err);
        }
      },
    });
  } catch (err) {
    console.error("❌ Error al iniciar el consumidor:", err);
  }
}