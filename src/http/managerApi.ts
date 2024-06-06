import { $authhost } from ".";
import { ICreateManagerViewModel } from "../interfaces/ViewModels/CreateViewModels/ICreateManagerViewModel";

export const getManagers = async () => {
    const { data } = await $authhost.get('api/Managers')
    return data;
}

export const createManagers = async (formData: ICreateManagerViewModel) => {
    const { data } = await $authhost.post('api/Auth/reg/manager', formData)
    return data;
}

export const deleteManager = async (id: number) => {
    const { data } = await $authhost.delete(`api/Managers/${id}`)
    return data;
}
