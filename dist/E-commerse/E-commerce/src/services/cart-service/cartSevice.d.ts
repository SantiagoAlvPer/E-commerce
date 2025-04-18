import { RemoveFromCartInput } from "../../shared/interfaces/removeFromCartInput";
import { AddTocartInput } from "../../shared/interfaces/addtocart";
export declare class CartService {
    private producer;
    addToCart(data: AddTocartInput): Promise<{
        message: string;
        eventId: string;
    }>;
    removeFromCart(data: RemoveFromCartInput): Promise<{
        message: string;
        removedProduct: string;
    }>;
}
