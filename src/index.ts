import db from './shared/mongo/database';
import express from 'express';
import dotenv from 'dotenv';
import cartRoutes from './controllers/routes/cart.routes'


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cartRoutes);

app.listen(PORT, () => {
  console.log(`Cart service listening on http://localhost:${PORT}`);
});