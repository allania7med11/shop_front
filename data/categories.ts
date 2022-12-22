export interface IsFile {
  url: string;
}

export interface IsDiscount {
  name: string;
  percent: string;
  active: boolean;
}

export interface IsProduct {
  id: number;
  name: string;
  price: string;
  price_currency: string;
  category: number;
  files: File[];
  discount: IsDiscount;
}

export interface IsCategory {
  id: number;
  name: string;
  slug: string;
  products: IsProduct[];
}
