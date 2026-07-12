import { AxiosError } from "axios";
import { AxiosInstance } from "../axios/axios";
import { API_ROUTES } from "../constants/api";
import type { Store } from "../types/store";

export interface CreateStorePayload {
  name: string;
  location: string;
}

export interface StoresResponse {
  success: boolean;
  stores: Store[];
  total: number;
  page: number;
  totalPages: number;
}

export const getStores = async (page = 1, limit = 10, search = ""): Promise<StoresResponse> => {
  try {
    const response = await AxiosInstance.get(API_ROUTES.STORES, {
      params: { page, limit, search }
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to fetch stores", { cause: error });
    }
    throw error;
  }
};

export const createStore = async (data: CreateStorePayload): Promise<Store> => {
  try {
    const response = await AxiosInstance.post(API_ROUTES.STORES, data);
    return response.data.store;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to create store", { cause: error });
    }
    throw error;
  }
};

export const updateStore = async (id: string, data: Partial<CreateStorePayload>): Promise<Store> => {
  try {
    const response = await AxiosInstance.put(`${API_ROUTES.STORES}/${id}`, data);
    return response.data.store;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to update store", { cause: error });
    }
    throw error;
  }
};

export const deleteStore = async (id: string): Promise<void> => {
  try {
    await AxiosInstance.delete(`${API_ROUTES.STORES}/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || "Failed to delete store", { cause: error });
    }
    throw error;
  }
};
