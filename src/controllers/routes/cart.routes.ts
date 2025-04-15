import { RemoveFromCartInput } from '../../shared/interfaces/removeFromCartInput';
import { AddTocartInput } from '../../shared/interfaces/addtocart';
import { CartService } from '../../services/cart-service/cartSevice';
import { Request, Response } from 'express';
import { Router } from 'express'


const router = Router();
const cartService = new CartService();

router.post('/api/cart/items', async (req: Request, res: Response): Promise<void> => {
  const { userId, productId, quantity } = req.body as AddTocartInput;

  if (!userId || !productId || !quantity) {
    res.status(400).json({ message: 'Faltan campos requeridos' });
    return;
  }

  try {
    const result = await cartService.addToCart({ userId, productId, quantity });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error al añadir al carrito:', error);
    res.status(500).json({ message: 'Error interno al añadir al carrito' });
  }
});

router.delete('/api/cart/items/:productId', async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body; // Considera obtener esto de un token de autenticación
  const { productId } = req.params;

  if (!userId || !productId) {
    res.status(400).json({ message: 'Faltan campos requeridos' });
    return;
  }

  try {
    const result = await cartService.removeFromCart({ userId, productId } as RemoveFromCartInput);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ message: 'Error interno al eliminar producto del carrito' });
  }
});

export default router;