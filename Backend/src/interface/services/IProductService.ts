import { IProduct } from "@/models/product/productModel";

export interface IProductService {
  createProduct(
    name: string,
    sku: string,
    description?: string
  ): Promise<IProduct>;

  getProducts(
    page: number,
    limit: number,
    search: string
  ): Promise<{
    products: IProduct[];
    total: number;
    page: number;
    totalPages: number;
  }>;

  getProductById(id: string): Promise<IProduct | null>;

  updateProduct(
    id: string,
    data: Partial<IProduct>
  ): Promise<IProduct | null>;

  deleteProduct(id: string): Promise<void>;
}