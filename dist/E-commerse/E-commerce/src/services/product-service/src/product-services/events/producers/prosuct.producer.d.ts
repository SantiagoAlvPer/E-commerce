import { ClientKafka } from '@nestjs/microservices';
import { Product } from '../../entities/product.entity';
export declare class ProductProducer {
    private readonly kafkaClient;
    constructor(kafkaClient: ClientKafka);
    emitProductCreatedEvent(product: Product): Promise<void>;
}
