import { ICartProduct } from "./ICartProduct";
import { IUser } from "./IUser";

export interface ICart {
  id: number;
  user: IUser;
  userId: number;
  isActive: boolean;
  cartProducts: ICartProduct[];
}
