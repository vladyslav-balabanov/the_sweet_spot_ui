import { ICart } from "./ICart";
import { IProduct } from "./IProduct";

export interface ICartProduct {
    id: number,
    product: IProduct,
    productId: number,
    cart: ICart,
    cartId: number,
    quantity: number,
}