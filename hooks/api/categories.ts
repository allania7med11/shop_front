import { useApi } from "./index";
import { useQuery } from "react-query";
import { IsCategory, IsProduct } from "@/data/categories";


export const useCategoriesRead = (enabled=true) => {
  const client = useApi();
  const queryFn = async () => {
    const reponse = await client.get("/categories/");
    const categories: IsCategory[]  = reponse.data;
    return categories
  };
  return useQuery("categories", queryFn, {enabled: enabled});
};

export const useCategoryRead = (slug, enabled=true) => {
  const client = useApi();
  const queryFn = async () => {
    const reponse = await client.get(`/categories/${slug}/`);
    const category: IsCategory = reponse.data;
    return category
  };
  return useQuery(["category", slug], queryFn, {enabled: enabled});
};

export const useProductRead = (slug, enabled=true) => {
  const client = useApi();
  const queryFn = async () => {
    const reponse = await client.get(`/products/${slug}/`);
    const product: IsProduct = reponse.data;
    return product
  };
  return useQuery(["product", slug], queryFn, {enabled: enabled});
};
