import { inject, injectable } from "tsyringe";
import { IStockService } from "@/interface/services/IStockService";
import { IStockRepository } from "@/interface/repositories/IStockRepository";
import { IProductRepository } from "@/interface/repositories/IProductRepository";
import { IStoreRepository } from "@/interface/repositories/IStoreRepository";
import { IStock } from "@/models/stock/stockModel";
import { PRODUCT_ROUTES } from "@/constant/Routes";
import { errorMessage } from "@/constant/errorMessage";

@injectable()
export class StockService implements IStockService {
  constructor(
    @inject("IStockRepository")
    private readonly _stockRepository: IStockRepository,

    @inject("IProductRepository")
    private readonly _productRepository: IProductRepository,

    @inject("IStoreRepository")
    private readonly _storeRepository: IStoreRepository
  ) {}

  async createStock(
    productId: string,
    storeId: string,
    quantity: number
  ): Promise<IStock> {

    const product = await this._productRepository.findById(productId);

    if (!product) {
      throw new Error(errorMessage.PRODUCT_NOT_FOUND);
    }

    const store = await this._storeRepository.findById(storeId);

    if (!store) {
      throw new Error(errorMessage.STORE_NOT_FOUND);
    }

    const existing = await this._stockRepository.findByProductAndStore(
      productId,
      storeId
    );

    if (existing) {
      throw new Error(errorMessage.STORE_ALREADY_EXISTS);
    }

    return await this._stockRepository.create({
      product: product._id,
      store: store._id,
      quantity,
    });
  }

  async getStocks(
    page: number,
    limit: number,
    search: string
  ) {
    const { stocks, total } =
      await this._stockRepository.findAll(
        page,
        limit,
        search
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

  async updateStock(
    id: string,
    quantity: number
  ) {
    return await this._stockRepository.update(id, {
      quantity,
    });
  }

  async deleteStock(id: string) {
    await this._stockRepository.delete(id);
  }
}