import { IStock } from "@/models/stock/stockModel";
import { ClientSession } from "mongoose";

export interface IStockRepository {
  create(data: Partial<IStock>): Promise<IStock>;

  findAll(
    page: number,
    limit: number,
    search: string
  ): Promise<{
    stocks: IStock[];
    total: number;
  }>;

  findById(id: string): Promise<IStock | null>;

 findByProductAndStore(
    productId: string,
    storeId: string,
    session?: ClientSession
  ): Promise<IStock | null>;

  update(
    id: string,
    data: Partial<IStock>
  ): Promise<IStock | null>;

  delete(id: string): Promise<void>;


save(
  stock: IStock,
  session?: ClientSession
): Promise<IStock>;
}