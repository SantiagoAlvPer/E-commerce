import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_PRODUCER',
        useFactory: (config: ConfigService) => {
          const kafkaBroker = config.get<string>('KAFKA_BROKER');
          if (!kafkaBroker) {
            throw new Error('KAFKA_BROKER environment variable is not defined');
          }
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                brokers: [kafkaBroker], // Ahora es string[] garantizado
              },
              // Opcional: Configuración del consumer si es necesario
              consumer: {
                groupId: config.get<string>(
                  'KAFKA_GROUP_ID',
                  'product-service-group',
                ),
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class KafkaModule {}
