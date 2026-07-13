import mongoose from "mongoose";
import { inject, injectable } from "tsyringe";

import { ITransferService } from "@/interface/services/ITransferService";
import { IStockRepository } from "@/interface/repositories/IStockRepository";
import { errorMessage } from "@/constant/errorMessage";

@injectable()
export class TransferService implements ITransferService {
  constructor(
    @inject("IStockRepository")
    private readonly _stockRepository: IStockRepository
  ) {}

  async transferStock(
    productId: string,
    fromStoreId: string,
    toStoreId: string,
    quantity: number
  ): Promise<void> {

    if (fromStoreId === toStoreId) {
      throw new Error(errorMessage.SOURCE_AND_DESTINATION_NOT_SAME);
    }

    if (quantity <= 0) {
      throw new Error(errorMessage.QUANTITY_MUST_BE_GREATER_THEN_ZERO);
    }

    const sourceStock =
      await this._stockRepository.findByProductAndStore(
        productId,
        fromStoreId
      );

    if (!sourceStock) {
      throw new Error(errorMessage.STOCK_NOT_FOUND);
    }

    let destinationStock =
      await this._stockRepository.findByProductAndStore(
        productId,
        toStoreId
      );

    if (!destinationStock) {
      destinationStock = await this._stockRepository.create({
        product: new mongoose.Types.ObjectId(productId),
        store: new mongoose.Types.ObjectId(toStoreId),
        quantity: 0
      });
    }

    if (sourceStock.quantity < quantity) {
      throw new Error(errorMessage.INSUFFICIENT_STOCK);
    }

    sourceStock.quantity -= quantity;
    destinationStock.quantity += quantity;

    await this._stockRepository.save(sourceStock);
    await this._stockRepository.save(destinationStock);
  }
}