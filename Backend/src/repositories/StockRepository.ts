import { injectable } from "tsyringe";
import { IStock, StockModel } from "@/models/stock/stockModel";
import { IStockRepository } from "@/interface/repositories/IStockRepository";
import { ClientSession } from "mongoose";

@injectable()
export class StockRepository implements IStockRepository {
  async create(data: Partial<IStock>): Promise<IStock> {
    return await StockModel.create(data);
  }

  async findAll(page: number, limit: number, search: string) {
    const query = {};

    const total = await StockModel.countDocuments(query);

    const stocks = await StockModel.find(query)
      .populate("product")
      .populate("store")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      stocks,
      total,
    };
  }

  async findById(id: string) {
    return await StockModel.findById(id).populate("product").populate("store");
  }

  async findByProductAndStore(
    productId: string,
    storeId: string,
    session?: ClientSession,
  ): Promise<IStock | null> {
    let query = StockModel.findOne({
      product: productId,
      store: storeId,
    });

    if (session) {
      query = query.session(session);
    }

    return await query;
  }

  async update(id: string, data: Partial<IStock>) {
    return await StockModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    await StockModel.findByIdAndDelete(id);
  }
  async save(stock: IStock, session?: ClientSession): Promise<IStock> {
    if (session) {
      return await stock.save({ session });
    }

    return await stock.save();
  }
}
