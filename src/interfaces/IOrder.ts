import { ICart } from "./ICart";

export interface IOrder {
    id: number,
    createdDate: string,
    updatedDate: string,
    cart: ICart,
    cartId: number,
    status: number,
    area: string,
    street: string,
    houseNumber: string,
}