"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true, unique: true },
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
});
exports.ProductModel = mongoose_1.default.model("Product", ProductSchema);
//# sourceMappingURL=cartProdutc.model.js.map