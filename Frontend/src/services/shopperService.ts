import { AxiosError } from "axios";
import { AxiosInstance } from "../axios/axios";
import { API_ROUTES } from "../constants/api";
import type { Product } from "../types/product";
import type { Stock } from "../types/stock";

export interface ShopperProductsResponse {
  success: boolean;
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ShopperStocksResponse {
  success: boolean;
  stocks: Stock[];
  total: number;
  page: number;
  totalPages: number;
}

export const getShopperProducts = async (page = 1, limit = 50, search = ""): Promise<ShopperProductsResponse> => {
  try {
    const response = await AxiosInstance.get(API_ROUTES.SHOPPER_PRODUCTS, {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to fetch shopper products", { cause: error });
    }
    throw error;
  }
};

export const getShopperStocks = async (page = 1, limit = 500): Promise<ShopperStocksResponse> => {
  try {
    const response = await AxiosInstance.get(API_ROUTES.SHOPPER_STOCKS, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to fetch shopper stocks", { cause: error });
    }
    throw error;
  }
};
