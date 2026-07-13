export interface StockProduct {
  _id: string;
  name: string;
  sku: string;
}

export interface StockStore {
  _id: string;
  name: string;
  location: string;
}

export interface Stock {
  _id: string;
  product: StockProduct;
  store: StockStore;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
