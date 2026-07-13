export interface ITransferService {
  transferStock(
    productId: string,
    fromStoreId: string,
    toStoreId: string,
    quantity: number
  ): Promise<void>;
}