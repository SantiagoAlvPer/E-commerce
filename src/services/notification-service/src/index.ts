import express from 'express';
import dotenv from 'dotenv';
import router from './controllers/notification.controller';
import { startKafkaConsumer } from './services/kafka.consumer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

// ✅ Usa el router correctamente
app.use('/api/notifications', router); 

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});

startKafkaConsumer().catch(console.error);