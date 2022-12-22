import { useApi } from "./index";
import { useQuery } from "react-query";
import { IsCategory } from "../../data/categories";


export const useCategoriesRead = () => {
  const client = useApi();
  const queryFn = async () => {
    const reponse = await client.get("/categories/");
    const categories: IsCategory[]  = reponse.data;
    return categories
  };
  return useQuery("categories", queryFn);
};

export const useCategoryRead = (slug) => {
  const client = useApi();
  const queryFn = async () => {
    const reponse = await client.get(`/categories/${slug}/`);
    const category: IsCategory = reponse.data;
    return category
  };
  return useQuery("categories", queryFn);
};
