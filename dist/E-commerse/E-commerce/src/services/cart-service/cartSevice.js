"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const cart_producer_1 = require("../../shared/events/producers/cart.producer");
const cartEvent_model_1 = require("../../models/cartEvent.model");
const uuid_1 = require("uuid");
const axios_1 = require("axios");
class CartService {
    producer = new cart_producer_1.Producer();
    async addToCart(data) {
        const eventId = (0, uuid_1.v4)();
        const timestamp = new Date().toISOString();
        const eventPayload = {
            eventId,
            timestamp,
            source: "CartService",
            topic: "cart-updates",
            payload: {
                userId: data.userId,
                productId: data.id,
                quantity: data.quantity,
            },
            snapshot: {
                cartId: `cart_${data.userId}`,
                totalItems: data.quantity,
                updatedAt: timestamp,
            },
        };
        try {
            const existingEvent = await cartEvent_model_1.EventModel.findOne({ eventId });
            if (!existingEvent) {
                await this.producer.send("cart-updates", eventPayload);
                await cartEvent_model_1.EventModel.create(eventPayload);
                console.log("Evento guardado en MongoDB:", eventPayload);
            }
            else {
                console.warn(`Evento con ID ${eventId} ya existe. Se omite inserción.`);
            }
        }
        catch (error) {
            if (error.code === 11000) {
                console.warn(`Evento duplicado con ID ${eventId}. Omitiendo inserción.`);
            }
            else {
                console.error("Error al procesar el evento:", error);
                throw new Error("No se pudo procesar el evento");
            }
        }
        return { message: "Producto añadido al carrito", eventId };
    }
    async removeFromCart(data) {
        const eventId = (0, uuid_1.v4)();
        const timestamp = new Date().toISOString();
        let productData = { title: "Producto desconocido", price: 0 };
        try {
            const response = await axios_1.default.get(`https://fakestoreapi.com/products/${data.id}`);
            productData = response.data;
        }
        catch (err) {
            console.error(`Error al obtener producto ${data.id} de FakeStoreAPI`);
            throw new Error(`No se pudo obtener el producto con ID ${data.id}`);
        }
        const cartRemovalEvent = {
            eventId: (0, uuid_1.v4)(),
            timestamp,
            source: "CartService",
            topic: "cart-removals",
            payload: {
                userId: data.userId,
            },
            snapshot: {
                userId: data.userId,
                productId: data.id,
                quantity: 1,
                title: productData.title,
            },
        };
        const notificationEvent = {
            eventId: (0, uuid_1.v4)(),
            timestamp,
            source: "CartService",
            topic: "notifications",
            payload: {
                to: `${data.userId}@example.com`,
                subject: "¿Olvidaste algo en tu carrito?",
                content: `Hola, vimos que eliminaste '${productData.title}' de tu carrito. ¡Vuelve pronto!`,
            },
            snapshot: {
                userId: data.userId,
                productId: data.id,
                title: productData.title,
                price: productData.price,
            },
        };
        try {
            const existingCartRemovalEvent = await cartEvent_model_1.EventModel.findOne({ eventId: cartRemovalEvent.eventId });
            const existingNotificationEvent = await cartEvent_model_1.EventModel.findOne({ eventId: notificationEvent.eventId });
            if (!existingCartRemovalEvent) {
                await this.producer.send("cart-removals", cartRemovalEvent);
                await cartEvent_model_1.EventModel.create(cartRemovalEvent);
            }
            else {
                console.warn(`Evento de eliminación del carrito con ID ${cartRemovalEvent.eventId} ya existe. Se omite inserción.`);
            }
            if (!existingNotificationEvent) {
                await this.producer.send("notifications", notificationEvent);
                await cartEvent_model_1.EventModel.create(notificationEvent);
            }
            else {
                console.warn(`Evento de notificación con ID ${notificationEvent.eventId} ya existe. Se omite inserción.`);
            }
        }
        catch (error) {
            if (error.code === 11000) {
                console.warn("Evento duplicado encontrado, omitiendo inserción.");
            }
            else {
                console.error("Error al procesar evento de eliminación del carrito:", error);
                throw new Error("No se pudo eliminar el producto del carrito");
            }
        }
        return { message: "Producto eliminado del carrito", removedProduct: productData.title };
    }
}
exports.CartService = CartService;
//# sourceMappingURL=cartSevice.js.map