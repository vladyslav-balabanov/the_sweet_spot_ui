import { IProductCreateViewModel } from "../CreateViewModels/IProductCreateViewModel";

export interface IProductEditViewModel extends IProductCreateViewModel {
    id: number,
}