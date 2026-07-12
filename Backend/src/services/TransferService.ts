import mongoose from "mongoose";
import { inject, injectable } from "tsyringe";

import { ITransferService } from "@/interface/services/ITransferService";
import { IStockRepository } from "@/interface/repositories/IStockRepository";

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
      throw new Error("Source and destination stores cannot be the same.");
    }

    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }

    const sourceStock =
      await this._stockRepository.findByProductAndStore(
        productId,
        fromStoreId
      );

    if (!sourceStock) {
      throw new Error("Source stock not found.");
    }

    let destinationStock =
      await this._stockRepository.findByProductAndStore(
        productId,
        toStoreId
      );

    if (!destinationStock) {
      // If the destination store has never held this product, create a new stock record with 0 quantity
      destinationStock = await this._stockRepository.create({
        product: new mongoose.Types.ObjectId(productId),
        store: new mongoose.Types.ObjectId(toStoreId),
        quantity: 0
      });
    }

    if (sourceStock.quantity < quantity) {
      throw new Error("Insufficient stock.");
    }

    sourceStock.quantity -= quantity;
    destinationStock.quantity += quantity;

    await this._stockRepository.save(sourceStock);
    await this._stockRepository.save(destinationStock);
  }
}