import { useState, useCallback } from "react";
import { getStores, createStore, updateStore, deleteStore, type CreateStorePayload } from "../services/storeService";
import type { Store } from "../types/store";

export const useStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = useCallback(async (page = 1, limit = 10, search = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getStores(page, limit, search);
      setStores(data.stores);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stores");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addStore = async (storeData: CreateStorePayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const newStore = await createStore(storeData);
      setStores((prev) => [newStore, ...prev]);
      setTotal((prev) => prev + 1);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create store";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const editStore = async (id: string, storeData: Partial<CreateStorePayload>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedStore = await updateStore(id, storeData);
      setStores((prev) => prev.map(s => s._id === id ? updatedStore : s));
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update store";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const removeStore = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteStore(id);
      setStores((prev) => prev.filter(s => s._id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete store";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stores,
    total,
    isLoading,
    error,
    fetchStores,
    addStore,
    editStore,
    removeStore,
  };
};
