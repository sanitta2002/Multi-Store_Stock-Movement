import { AxiosError } from "axios";
import { AxiosInstance } from "../axios/axios";
import { API_ROUTES } from "../constants/api";
import type { Stock } from "../types/stock";

export interface CreateStockPayload {
  productId: string;
  storeId: string;
  quantity: number;
}

export interface StocksResponse {
  success: boolean;
  stocks: Stock[];
  total: number;
  page: number;
  totalPages: number;
}

export const getStocks = async (page = 1, limit = 10, search = ""): Promise<StocksResponse> => {
  try {
    const response = await AxiosInstance.get(API_ROUTES.STOCK, {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to fetch stock", { cause: error });
    }
    throw error;
  }
};

export const createStock = async (data: CreateStockPayload): Promise<Stock> => {
  try {
    const response = await AxiosInstance.post(API_ROUTES.STOCK, data);
    return response.data.stock;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to create stock", { cause: error });
    }
    throw error;
  }
};

export const updateStock = async (id: string, quantity: number): Promise<Stock> => {
  try {
    const response = await AxiosInstance.put(`${API_ROUTES.STOCK}/${id}`, { quantity });
    return response.data.stock;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to update stock", { cause: error });
    }
    throw error;
  }
};

export const deleteStock = async (id: string): Promise<void> => {
  try {
    await AxiosInstance.delete(`${API_ROUTES.STOCK}/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to delete stock", { cause: error });
    }
    throw error;
  }
};
