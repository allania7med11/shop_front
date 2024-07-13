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

interface IsProduct {
    id: number;
    name: string;
    files: IsProductFile[];
}

export interface IsCartItemRead {
    id: number;
    product: IsProduct;
    quantity: number;
    subtotal: string;
}

export interface IsCart {
    total_amount: string;
    items: IsCartItemRead[];
}
