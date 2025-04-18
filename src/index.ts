import connectDB from './shared/mongo/database';
import express from 'express';
import dotenv from 'dotenv';
import cartRoutes from './controllers/routes/cart.routes';

import { kafka } from './shared/kafka/kafkaClient';
import { startCartConsumer } from './shared/events/consumers/cart.consumer';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cartRoutes);

// Función para probar conexión a Kafka
const testKafkaConnection = async () => {
  const producer = kafka.producer();
  try {
    await producer.connect();
    console.log('✅ Conectado a Kafka correctamente');
    await producer.disconnect();
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Error al conectar a Kafka:', error.message);
    } else {
      console.error('❌ Error al conectar a Kafka:', error);
    }
  }
};

// Función principal para iniciar el servidor
const startServer = async () => {
  try {
    console.log('🔌 Conectando a la base de datos...');
    await connectDB(); // Conexión Mongo
    console.log('✅ Conexión exitosa a MongoDB');

    await testKafkaConnection(); // Probar Kafka

    // Iniciar el consumidor de Kafka después de la conexión exitosa
    await startCartConsumer();
    console.log('🎧 Consumidor de Kafka iniciado');

    // Iniciar servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Cart service escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Arranque del servicio
startServer();