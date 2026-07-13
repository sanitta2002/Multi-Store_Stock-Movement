import { useState, useCallback } from "react";
import { getShopperProducts, getShopperStocks } from "../services/shopperService";
import type { Product } from "../types/product";
import type { Stock } from "../types/stock";

export const useShopper = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShopperData = useCallback(async (search = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsData, stocksData] = await Promise.all([
        getShopperProducts(1, 50, search),
        getShopperStocks(1, 500)
      ]);
      setProducts(productsData.products);
      setStocks(stocksData.stocks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load catalog");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    products,
    stocks,
    isLoading,
    error,
    fetchShopperData,
  };
};
