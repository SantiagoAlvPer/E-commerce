import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductProducer {
  constructor(
    @Inject('KAFKA_PRODUCER') private readonly kafkaClient: ClientKafka,
  ) {}

  async emitProductCreatedEvent(product: Product) {
    this.kafkaClient.emit('product-created', {
      eventId: Date.now().toString(),
      timestamp: new Date(),
      source: 'product-service',
      payload: product,
    });
  }
}
