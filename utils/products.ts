import { IsCartItem } from "@/data/cart";
import { IsProduct } from "@/data/categories";

function getValue(obj, key) {
  return obj.hasOwnProperty(key) ? obj[key] : null;
}

export const addItemsToProducts = (
  products: IsProduct[],
  items: IsCartItem[]
) => {
  const mapProductItem = items.reduce((acc, item) => {
    acc[item.product] = item;
    return acc;
  }, {});
  return products.map((product) => ({
    ...product,
    cart_item: getValue(mapProductItem, product.id),
  }));
};
