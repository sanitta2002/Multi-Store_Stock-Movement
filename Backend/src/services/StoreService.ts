import { inject, injectable } from "tsyringe";
import { IStoreService } from "@/interface/services/IStoreService";
import { IStoreRepository } from "@/interface/repositories/IStoreRepository";
import { IStore } from "@/models/store/storeModel";
import { errorMessage } from "@/constant/errorMessage";

@injectable()
export class StoreService implements IStoreService {
  constructor(
    @inject("IStoreRepository")
    private readonly _storeRepository: IStoreRepository
  ) {}

  async createStore(
    name: string,
    location: string
  ): Promise<IStore> {
    const existingStore = await this._storeRepository.findByNameAndLocation(name, location);

    if (existingStore) {
      throw new Error(errorMessage.STORE_ALREADY_EXISTS);
    }

    return await this._storeRepository.create({
      name,
      location,
    });
  }

  async getStores(
    page: number,
    limit: number,
    search: string
  ) {
    const { stores, total } =
      await this._storeRepository.findAll(
        page,
        limit,
        search
      );

    return {
      stores,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getStoreById(id: string): Promise<IStore | null> {
    return await this._storeRepository.findById(id);
  }

  async updateStore(
    id: string,
    data: Partial<IStore>
  ): Promise<IStore | null> {
    if (data.name && data.location) {
      const existingStore =
        await this._storeRepository.findByNameAndLocation(data.name, data.location);

      if (
        existingStore &&
        existingStore._id.toString() !== id
      ) {
        throw new Error(errorMessage.STORE_ALREADY_EXISTS);
      }
    }

    return await this._storeRepository.update(id, data);
  }

  async deleteStore(id: string): Promise<void> {
    await this._storeRepository.delete(id);
  }
}