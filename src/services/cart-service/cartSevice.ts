import { RemoveFromCartInput } from '../../shared/interfaces/removeFromCartInput'
import { Producer } from '../../shared/events/producers/cart.producer';
import { AddTocartInput } from '../../shared/interfaces/addtocart';
import { EventModel } from '../../models/cartEvent.model';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

export class CartService {
    private producer = new Producer();

  async addToCart(data: AddTocartInput) {
    const eventId = uuidv4();
    const timestamp = new Date().toISOString();

    const eventPayload = {
      eventId,
      timestamp,
      source: 'CartService',
      topic: 'cart-updates',
      payload: {
        userId: data.userId,
        productId: data.productId,
        quantity: data.quantity
      },
      snapshot: {
        cartId: `cart_${data.userId}`,
        totalItems: data.quantity,
        updatedAt: timestamp
      }
    };

    // Publicar en Kafka y guardar en Mongo
    await this.producer.send('cart-updates', eventPayload);
    await EventModel.create(eventPayload);

    return { message: 'Producto añadido al carrito', eventId };
  }

  async removeFromCart(data: RemoveFromCartInput) {
    const eventId = uuidv4();
    const timestamp = new Date().toISOString();

    // Obtener detalles del producto desde la API externa
    let productData = { title: 'Producto desconocido', price: 0 };
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${data.productId}`);
      productData = response.data as { title: string; price: number };
    } catch (err) {
      console.error(`Error al obtener producto ${data.productId} de FakeStoreAPI`);
    }

    //Evento de eliminación
    const cartRemovalEvent = {
      eventId,
      timestamp,
      source: 'CartService',
      topic: 'cart-removals',
      payload: {
        userId: data.userId
      },
      snapshot: {
        userId: data.userId,
        productId: data.productId,
        quantity: 1,
        title: productData.title
      }
    };

    // Evento de notificación
    const notificationEvent = {
      eventId: uuidv4(),
      timestamp,
      source: 'CartService',
      topic: 'notifications',
      payload: {
        to: `${data.userId}@example.com`,
        subject: '¿Olvidaste algo en tu carrito?',
        content: `Hola, vimos que eliminaste '${productData.title}' de tu carrito. ¡Vuelve pronto!`
      }
    };

    // Enviar eventos y guardarlos
    await this.producer.send('cart-removals', cartRemovalEvent);
    await this.producer.send('notifications', notificationEvent);
    await EventModel.create(cartRemovalEvent);
    await EventModel.create(notificationEvent);

    return { message: 'Producto eliminado del carrito', removedProduct: productData.title };
  }
}