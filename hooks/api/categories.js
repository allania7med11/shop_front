import { useApi } from 'hooks/api';
import { useQuery } from 'react-query';


export const useCategoriesRead = () => {
    const client = useApi();
    const queryFn = async () => client.get("/categories/");
    return useQuery('categories', queryFn)
};