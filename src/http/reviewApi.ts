import { $authhost } from ".";

export const getReviews = async () => {
    const { data } = await $authhost.get('api/Reviews')
    return data;
}