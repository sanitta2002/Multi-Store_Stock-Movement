import { IStore } from "@/models/store/storeModel";

export interface IStoreService {
  createStore(
    name: string,
    location: string
  ): Promise<IStore>;

  getStores(
    page: number,
    limit: number,
    search: string
  ): Promise<{
    stores: IStore[];
    total: number;
    page: number;
    totalPages: number;
  }>;

  getStoreById(id: string): Promise<IStore | null>;

  updateStore(
    id: string,
    data: Partial<IStore>
  ): Promise<IStore | null>;

  deleteStore(id: string): Promise<void>;
}