export interface IsCartItem {
    id: number;
    product: number;
    quantity: number;
}

export interface IsAddress {
    street: string;
    city: string;
    zip_code: string;
    country: string;
    phone: string;
}


interface IsProductFile {
    url: string;
}

export interface IsCartProduct {
    slug: string;
    id: number;
    name: string;
    files: IsProductFile[];
}

export interface IsCartItemRead {
    id: number;
    product: IsCartProduct;
    quantity: number;
    subtotal: string;
}

export interface IsCart {
    total_amount: string;
    items: IsCartItemRead[];
}

export interface IsPayment {
    payment_method: string;
    payment_method_id?: string;
}


export interface IsOrder {
    address: IsAddress;
    payment: IsPayment;
}