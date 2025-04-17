import { OnModuleInit } from "@nestjs/common";
export declare class KafkaProducerService implements OnModuleInit {
    onModuleInit(): Promise<void>;
    emit(type: string, payload: any, topic?: string): Promise<void>;
}
