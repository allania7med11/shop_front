import { CartTable } from "./cartTable";
import * as React from "react";
import { useProductsQuery } from "@/store/reducer/apis/productApi";
import { useCurrentCartQuery } from "@/store/reducer/apis/cartApi";
import { addItemsToProducts } from "@/utils/products";

export const CartStep = () => {
  const { data } = useCurrentCartQuery();
  const items = data ? data.items : []
  const product_ids = items.map((item) => item.product.id);
  let { data: productsApi = [] } = useProductsQuery(
    { id_in: product_ids },
    {
      skip: product_ids.length === 0,
    }
  );
  if (product_ids.length === 0) {
    productsApi = [];
  } 
  const products = addItemsToProducts(productsApi, items);
  return (
    <CartTable products={products} />
  );
};
