import { IStore } from "@/models/store/storeModel";

export interface IStoreRepository {
  create(data: Partial<IStore>): Promise<IStore>;

  findAll(
    page: number,
    limit: number,
    search: string
  ): Promise<{
    stores: IStore[];
    total: number;
  }>;

  findById(id: string): Promise<IStore | null>;

  findByNameAndLocation(name: string, location: string): Promise<IStore | null>;

  update(
    id: string,
    data: Partial<IStore>
  ): Promise<IStore | null>;

  delete(id: string): Promise<void>;
}