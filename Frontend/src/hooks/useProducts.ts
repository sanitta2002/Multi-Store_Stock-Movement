import { useState, useCallback } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct, type CreateProductPayload } from "../services/productService";
import type { Product } from "../types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (page = 1, limit = 10, search = "") => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProducts(page, limit, search);
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addProduct = async (productData: CreateProductPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const newProduct = await createProduct(productData);
      setProducts((prev) => [newProduct, ...prev]);
      setTotal((prev) => prev + 1);
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create product";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const editProduct = async (id: string, productData: Partial<CreateProductPayload>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedProduct = await updateProduct(id, productData);
      setProducts((prev) => prev.map(p => p._id === id ? updatedProduct : p));
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update product";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter(p => p._id !== id));
      setTotal((prev) => Math.max(0, prev - 1));
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete product";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    total,
    isLoading,
    error,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
  };
};
