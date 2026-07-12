import { AxiosError } from "axios";
import { AxiosInstance } from "../axios/axios";
import { API_ROUTES } from "../constants/api";

export interface TransferPayload {
  productId: string;
  fromStoreId: string;
  toStoreId: string;
  quantity: number;
}

export const executeTransfer = async (data: TransferPayload): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await AxiosInstance.post(API_ROUTES.TRANSFERS, data);
    return { success: true, message: response.data.message };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to transfer stock", { cause: error });
    }
    throw error;
  }
};
