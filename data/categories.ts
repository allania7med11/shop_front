export interface IsFile {
  url: string;
}

export interface IsDiscount {
  name: string;
  percent: string;
  active: boolean;
}


export interface IsCategoryNoProducts {
  id: number;
  name: string;
  slug: string;
}
export interface IsProduct {
  url: string;
  slug: string;
  id: number;
  name: string;
  price: string;
  price_currency: string;
  current_price: number;
  category: IsCategoryNoProducts;
  files: IsFile[];
  discount: IsDiscount;
  description_html: string;
}

export type IsProductOrder = "current_price" | "-current_price" | "name" | "-name"| "";

export interface IsProductFilters {
  category: string;
  search: string[];
  current_price_min: string;
  current_price_max: string;
  discount_min: string;
  discount_max: string;
  ordering: IsProductOrder;
}

export interface IsCategory extends IsCategoryNoProducts {
  products: IsProduct[];
}
