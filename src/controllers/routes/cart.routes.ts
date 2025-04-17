import { Producer } from "../../shared/events/producers/cart.producer";
import { AddTocartInput } from "../../shared/interfaces/addtocart";
import { CartService } from "../../services/cart-service/cartSevice";
import { Router, Request, Response } from "express";


const router = Router();
const cartService = new CartService();


router.post("/api/cart/items", async (req: Request, res: Response): Promise<any>=> {
  const { userId, id, quantity } = req.body;

  if (!userId || !id || !quantity) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  try {
    const result = await cartService.addToCart({ userId, id, quantity });
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al añadir al carrito" });
  }
});

router.delete("/api/cart/items/:id", async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.body;
  const { id } = req.params;

  if (!userId || !id) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  try {
    const result = await cartService.removeFromCart({ id, userId });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar producto del carrito" });
  }
});

export default router;