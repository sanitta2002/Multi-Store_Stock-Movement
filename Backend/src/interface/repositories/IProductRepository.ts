import { IProduct } from "@/models/product/productModel";

export interface IProductRepository {
  create(data: Partial<IProduct>): Promise<IProduct>;

  findAll(
    page: number,
    limit: number,
    search: string
  ): Promise<{
    products: IProduct[];
    total: number;
  }>;

  findById(id: string): Promise<IProduct | null>;

  findBySku(sku: string): Promise<IProduct | null>;

  update(
    id: string,
    data: Partial<IProduct>
  ): Promise<IProduct | null>;

  delete(id: string): Promise<void>;
}