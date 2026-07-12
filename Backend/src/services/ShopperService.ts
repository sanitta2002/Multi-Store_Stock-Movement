import { inject, injectable } from "tsyringe";

import { IShopperService } from "@/interface/services/IShopperService";
import { IProductRepository } from "@/interface/repositories/IProductRepository";
import { IStockRepository } from "@/interface/repositories/IStockRepository";

@injectable()
export class ShopperService implements IShopperService {
  constructor(
    @inject("IProductRepository")
    private readonly _productRepository: IProductRepository,

    @inject("IStockRepository")
    private readonly _stockRepository: IStockRepository,
  ) {}

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

  async getProductById(id: string) {
    return await this._productRepository.findById(id);
  }

  async getStocks(page: number, limit: number) {
    const { stocks, total } = await this._stockRepository.findAll(
      page,
      limit,
      "",
    );

    return {
      stocks,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getStockById(id: string) {
    return await this._stockRepository.findById(id);
  }
}
