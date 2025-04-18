"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cartSevice_1 = require("../../services/cart-service/cartSevice");
const express_1 = require("express");
const cartEvent_model_1 = require("../../models/cartEvent.model");
const cartItem_model_1 = require("../../models/cartItem.model");
const router = (0, express_1.Router)();
const cartService = new cartSevice_1.CartService();
router.post("/api/cart/items", async (req, res) => {
    const { userId, id, quantity } = req.body;
    if (!userId || !id || !quantity) {
        return res.status(400).json({ message: "Faltan campos requeridos" });
    }
    try {
        const result = await cartService.addToCart({ userId, id, quantity });
        return res.status(201).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al añadir al carrito" });
    }
});
router.delete("/api/cart/items/:id", async (req, res) => {
    const { userId } = req.body;
    const { id } = req.params;
    if (!userId || !id) {
        return res.status(400).json({ message: "Faltan campos requeridos" });
    }
    try {
        const result = await cartService.removeFromCart({ id, userId });
        return res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al eliminar producto del carrito" });
    }
});
router.get('/events', async (req, res) => {
    const events = await cartEvent_model_1.EventModel.find().limit(10);
    res.json(events);
});
router.get("/cart-items", async (req, res) => {
    try {
        const cartItems = await cartItem_model_1.CartItemModel.find();
        res.status(200).json(cartItems);
    }
    catch (error) {
        console.error("❌ Error al obtener los carritos:", error);
        res.status(500).json({ message: "Error al obtener los carritos" });
    }
});
exports.default = router;
//# sourceMappingURL=cart.routes.js.map