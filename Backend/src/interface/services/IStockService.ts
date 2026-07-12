import { IStock } from "@/models/stock/stockModel";

export interface IStockService {
  createStock(
    productId: string,
    storeId: string,
    quantity: number
  ): Promise<IStock>;

  getStocks(
    page: number,
    limit: number,
    search: string
  ): Promise<{
    stocks: IStock[];
    total: number;
    page: number;
    totalPages: number;
  }>;

  getStockById(id: string): Promise<IStock | null>;

  updateStock(
    id: string,
    quantity: number
  ): Promise<IStock | null>;

  deleteStock(id: string): Promise<void>;
}