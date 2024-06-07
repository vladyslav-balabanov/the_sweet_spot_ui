import { $authhost } from ".";
import { IOrderEditViewModel } from "../interfaces/ViewModels/EditViewModels/IOrderEditViewModel";

export const getOrders = async () => {
    const { data } = await $authhost.get('api/Orders')
    return data;
}

export const editOrder = async (formData: IOrderEditViewModel) => {
    const { data } = await $authhost.patch('api/Orders', formData);
    return data;
}
