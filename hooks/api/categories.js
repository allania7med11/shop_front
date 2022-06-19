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