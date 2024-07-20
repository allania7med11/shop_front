import { IsCartItem, IsCartItemRead } from "@/data/cart";
import { IsProduct } from "@/data/categories";

function getValue(obj, key, dflt) {
  return obj.hasOwnProperty(key) ? obj[key] : dflt;
}

export const addItemsToProducts = (
  products: IsProduct[],
  items: IsCartItemRead[]
) : IsProduct[] => {
  const mapProductItem = items.reduce((acc, item) => {
    acc[item.product.id] = {
      id: item.id,
      product: item.product.id,
      quantity: item.quantity,
    };
    return acc;
  }, {});
  return products.map((product) => ({
    ...product,
    cart_item: getValue(mapProductItem, product.id, {
      id: 0,
      product: product.id,
      quantity: 0,
    }),
  }));
};
