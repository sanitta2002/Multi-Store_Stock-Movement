import { injectable } from "tsyringe";
import { StoreModel, IStore } from "@/models/store/storeModel";
import { IStoreRepository } from "@/interface/repositories/IStoreRepository";

@injectable()
export class StoreRepository implements IStoreRepository {

  async create(data: Partial<IStore>): Promise<IStore> {
    return await StoreModel.create(data);
  }

  async findAll(
    page: number,
    limit: number,
    search: string
  ) {
    const query = {
      name: {
        $regex: search,
        $options: "i",
      },
    };

    const total = await StoreModel.countDocuments(query);

    const stores = await StoreModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    return {
      stores,
      total,
    };
  }

  async findById(id: string) {
    return await StoreModel.findById(id);
  }

  async findByNameAndLocation(name: string, location: string) {
    return await StoreModel.findOne({ name, location });
  }

  async update(
    id: string,
    data: Partial<IStore>
  ) {
    return await StoreModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  }

  async delete(id: string): Promise<void> {
    await StoreModel.findByIdAndDelete(id);
  }
}