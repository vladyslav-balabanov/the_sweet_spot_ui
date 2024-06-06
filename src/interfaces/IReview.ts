import { IProduct } from "./IProduct";
import { IUser } from "./IUser";

export interface IReview {
    id: number,
    text: string,
    grade: number,
    product: IProduct,
    productId: number,
    user: IUser,
    userId: number,
}