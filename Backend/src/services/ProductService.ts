import { inject, injectable } from "tsyringe";
import { IProductService } from "@/interface/services/IProductService";
import { IProductRepository } from "@/interface/repositories/IProductRepository";
import { IProduct } from "@/models/product/productModel";
import { errorMessage } from "@/constant/errorMessage";

@injectable()
export class ProductService implements IProductService {
  constructor(
    @inject("IProductRepository")
    private readonly _productRepository: IProductRepository,
  ) {}

  async createProduct(
    name: string,
    sku: string,
    description?: string,
  ): Promise<IProduct> {
    const existing = await this._productRepository.findBySku(sku);

    if (existing) {
      throw new Error(errorMessage.PRODUCT_ALREADY_EXIXTS);
    }

    return await this._productRepository.create({
      name,
      sku,
      description: description ?? "",
    });
  }

  async getProducts(page: number, limit: number, search: string) {
    const { products, total } = await this._productRepository.findAll(
      page,
      limit,
      search,
    );

    return {
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProductById(id: string): Promise<IProduct | null> {
    return await this._productRepository.findById(id);
  }

  async updateProduct(
    id: string,
    data: Partial<IProduct>,
  ): Promise<IProduct | null> {
    if (data.sku) {
      const existing = await this._productRepository.findBySku(data.sku);

      if (existing && existing._id.toString() !== id) {
        throw new Error(errorMessage.PRODUCT_ALREADY_EXIXTS);
      }
    }

    return await this._productRepository.update(id, data);
  }

  async deleteProduct(id: string): Promise<void> {
    await this._productRepository.delete(id);
  }
}
