import { RemoveFromCartInput } from "../../shared/interfaces/removeFromCartInput";
import { Producer } from "../../shared/events/producers/cart.producer";
import { AddTocartInput } from "../../shared/interfaces/addtocart";

import { EventModel } from "../../models/cartEvent.model";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";


interface ProductData {
  title: string;
  price: number;
}

export class CartService {
  private producer = new Producer();

  async addToCart(data: AddTocartInput) {
    const eventId = uuidv4();
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
      // Verificar si el evento ya existe en la base de datos
      const existingEvent = await EventModel.findOne({ eventId });
      if (!existingEvent) {
        await this.producer.send("cart-updates", eventPayload);
        await EventModel.create(eventPayload);
        console.log("Evento guardado en MongoDB:", eventPayload);
      } else {
        console.warn(`Evento con ID ${eventId} ya existe. Se omite inserción.`);
      }
    } catch (error: any) {
      if (error.code === 11000) {
        console.warn(`Evento duplicado con ID ${eventId}. Omitiendo inserción.`);
      } else {
        console.error("Error al procesar el evento:", error);
        throw new Error("No se pudo procesar el evento");
      }
    }

    return { message: "Producto añadido al carrito", eventId };
  }

  async removeFromCart(data: RemoveFromCartInput) {
    const eventId = uuidv4();
    const timestamp = new Date().toISOString();

    // Inicializar productData con un valor predeterminado
    let productData: ProductData = { title: "Producto desconocido", price: 0 };

    try {
      // Hacer la solicitud y especificar el tipo de respuesta
      const response = await axios.get<ProductData>(`https://fakestoreapi.com/products/${data.id}`);
      
      // Asignar los datos a productData
      productData = response.data;
    } catch (err) {
      console.error(`Error al obtener producto ${data.id} de FakeStoreAPI`);
      throw new Error(`No se pudo obtener el producto con ID ${data.id}`);
    }

    const cartRemovalEvent = {
      eventId: uuidv4(),
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
      eventId: uuidv4(),
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
      // Verificar si los eventos ya existen en la base de datos antes de insertarlos
      const existingCartRemovalEvent = await EventModel.findOne({ eventId: cartRemovalEvent.eventId });
      const existingNotificationEvent = await EventModel.findOne({ eventId: notificationEvent.eventId });

      if (!existingCartRemovalEvent) {
        await this.producer.send("cart-removals", cartRemovalEvent);
        await EventModel.create(cartRemovalEvent);
      } else {
        console.warn(`Evento de eliminación del carrito con ID ${cartRemovalEvent.eventId} ya existe. Se omite inserción.`);
      }

      if (!existingNotificationEvent) {
        await this.producer.send("notifications", notificationEvent);
        await EventModel.create(notificationEvent);
      } else {
        console.warn(`Evento de notificación con ID ${notificationEvent.eventId} ya existe. Se omite inserción.`);
      }
    } catch (error: any) {
      if (error.code === 11000) {
        console.warn("Evento duplicado encontrado, omitiendo inserción.");
      } else {
        console.error("Error al procesar evento de eliminación del carrito:", error);
        throw new Error("No se pudo eliminar el producto del carrito");
      }
    }

    return { message: "Producto eliminado del carrito", removedProduct: productData.title };
  }
}