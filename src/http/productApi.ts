import { $authhost } from ".";

export const getProducts = async () => {
    const { data } = await $authhost.get('api/Products')
    return data;
}

export const createProduct = async (formData: FormData) => {
    const { data } = await $authhost.post('api/Products', formData)
    return data;
}

export const editProduct = async (id: number, formData: FormData) => {
    const { data } = await $authhost.put(`api/Products/${id}`, formData)
    return data;
}

export const deleteProduct = async (id: number) => {
    const { data } = await $authhost.delete(`api/Products/${id}`)
    return data;
}
