import { useState, useCallback } from "react";
import { getStocks, createStock, updateStock, deleteStock, type CreateStockPayload } from "../services/stockService";
import type { Stock } from "../types/stock";

export const useStock = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStocks = useCallback(async (page = 1, limit = 10, search = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getStocks(page, limit, search);
      setStocks(data.stocks);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stock");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addStock = async (payload: CreateStockPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      await createStock(payload);
      await fetchStocks();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add stock";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const adjustStock = async (id: string, quantity: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await updateStock(id, quantity);
      await fetchStocks();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update stock";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const removeStock = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteStock(id);
      setStocks((prev) => prev.filter(s => s._id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete stock";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    stocks,
    total,
    isLoading,
    error,
    fetchStocks,
    addStock,
    adjustStock,
    removeStock,
  };
};
