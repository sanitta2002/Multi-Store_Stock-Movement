import { AxiosError } from "axios";
import { AxiosInstance } from "../axios/axios";
import { API_ROUTES } from "../constants/api";
import type { Product } from "../types/product";

export interface CreateProductPayload {
  name: string;
  sku: string;
  description?: string;
  price?: number;
}

export interface ProductsResponse {
  success: boolean;
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export const getProducts = async (page = 1, limit = 10, search = ""): Promise<ProductsResponse> => {
  try {
    const response = await AxiosInstance.get(API_ROUTES.PRODUCTS, {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to fetch products", { cause: error });
    }
    throw error;
  }
};

export const createProduct = async (data: CreateProductPayload): Promise<Product> => {
  try {
    const response = await AxiosInstance.post(API_ROUTES.PRODUCTS, data);
    return response.data.product;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to create product", { cause: error });
    }
    throw error;
  }
};

export const updateProduct = async (id: string, data: Partial<CreateProductPayload>): Promise<Product> => {
  try {
    const response = await AxiosInstance.put(`${API_ROUTES.PRODUCTS}/${id}`, data);
    return response.data.product;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to update product", { cause: error });
    }
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await AxiosInstance.delete(`${API_ROUTES.PRODUCTS}/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to delete product", { cause: error });
    }
    throw error;
  }
};
