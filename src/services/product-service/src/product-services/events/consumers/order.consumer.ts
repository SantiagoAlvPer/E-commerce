// import { Injectable } from '@nestjs/common';
// import { KafkaMessage } from 'kafkajs';
// import { SubscribeTo } from '../../shared/kafka/decorators/kafka.decorator';

// @Injectable()
// export class OrderConsumer {
//   @SubscribeTo('order-created')
//   async handleOrderCreated(message: KafkaMessage) {
//     const order = JSON.parse(message.value.toString());
//     console.log('Received order:', order);
//     // Lógica para actualizar stock, etc.
//   }
// }
