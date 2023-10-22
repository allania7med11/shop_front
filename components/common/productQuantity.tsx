import { useCartItemsQuery } from "@/store/reducer/apis/cartApi";

export const ProductQuantity: React.FC<{
    product_id: number;
}> = ({ product_id }) => {
    const { data } = useCartItemsQuery();
    const items = data ? data : [];
    const item = items.find((elm) => elm.id == product_id)
    const quantity = item ? item.quantity : 0
    return <div>{quantity}</div>
}