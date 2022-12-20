import { useApi } from 'hooks/api';
import { useQuery } from 'react-query';


export const useCategoriesRead = () => {
    const client = useApi();
    const queryFn = async () => {
        const reponse = await client.get("/categories/")
        return reponse.data
    };
    return useQuery('categories', queryFn)
};

export const useCategoryRead = (slug) => {
    const client = useApi();
    const queryFn = async () => {
        const reponse = await client.get(`/categories/${slug}/`)
        return reponse.data
    };
    return useQuery('categories', queryFn)
};