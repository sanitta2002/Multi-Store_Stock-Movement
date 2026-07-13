import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/common/PageHeader";
import { Table } from "../components/common/Table";
import type { Column } from "../components/common/Table";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { EmptyState } from "../components/common/EmptyState";
import { useStock } from "../hooks/useStock";
import { useProducts } from "../hooks/useProducts";
import { useStores } from "../hooks/useStores";
import type { Stock } from "../types/stock";

export default function Stock() {
  const { stocks, isLoading, error, fetchStocks, addStock, adjustStock, removeStock } = useStock();
  const { products, fetchProducts } = useProducts();
  const { stores, fetchStores } = useStores();

  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [storeId, setStoreId] = useState("");
  const [quantity, setQuantity] = useState("");


  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustId, setAdjustId] = useState("");
  const [adjustQty, setAdjustQty] = useState("");
  const [adjustLabel, setAdjustLabel] = useState("");

  useEffect(() => {
    fetchStocks();
    fetchProducts();
    fetchStores();
  }, [fetchStocks, fetchProducts, fetchStores]);

  const handleOpenAdd = () => {
    setProductId("");
    setStoreId("");
    setQuantity("");
    setIsAddModalOpen(true);
  };

  const handleOpenAdjust = (stock: Stock) => {
    setAdjustId(stock._id);
    setAdjustQty(String(stock.quantity));
    setAdjustLabel(`${stock.product.name} @ ${stock.store.name}`);
    setIsAdjustModalOpen(true);
  };

  const handleDelete = async (id: string, label: string) => {
    if (window.confirm(`Remove stock record for "${label}"?`)) {
      const result = await removeStock(id);
      if (result.success) {
        toast.success("Stock record removed successfully");
      } else {
        toast.error(result.error || "Failed to remove stock");
      }
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productId) {
      toast.warning("Please select a product.");
      return;
    }
    if (!storeId) {
      toast.warning("Please select a store.");
      return;
    }
    const qty = Number(quantity);
    if (!quantity || isNaN(qty) || qty < 0) {
      toast.warning("Quantity must be a valid number (0 or more).");
      return;
    }

    const result = await addStock({ productId, storeId, quantity: qty });
    if (result.success) {
      toast.success("Stock added successfully!");
      setIsAddModalOpen(false);
    } else {
      toast.error(result.error || "Failed to add stock");
    }
  };

  const handleAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const qty = Number(adjustQty);
    if (adjustQty === "" || isNaN(qty) || qty < 0) {
      toast.warning("Quantity must be 0 or greater.");
      return;
    }

    const result = await adjustStock(adjustId, qty);
    if (result.success) {
      toast.success("Stock updated successfully!");
      setIsAdjustModalOpen(false);
    } else {
      toast.error(result.error || "Failed to update stock");
    }
  };

  const getBadgeColor = (qty: number) => {
    if (qty === 0) return "bg-red-100 text-red-700";
    if (qty < 10) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  const columns: Column<Stock>[] = [
    {
      header: "Product",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-blue-400 shrink-0" />
          <div>
            <p className="font-medium text-gray-800">{item.product.name}</p>
            <p className="text-xs text-gray-400">{item.product.sku}</p>
          </div>
        </div>
      ),
    },
    { header: "Store", cell: (item) => <span>{item.store.name}</span> },
    { header: "Location", cell: (item) => <span className="text-gray-500 text-xs">{item.store.location}</span> },
    {
      header: "Quantity",
      cell: (item) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getBadgeColor(item.quantity)}`}>
          {item.quantity}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleOpenAdjust(item)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
            title="Adjust Quantity"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(item._id, `${item.product.name} @ ${item.store.name}`)}
            className="text-gray-400 hover:text-red-600 transition-colors"
            title="Remove Stock"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Stock Inventory"
        description="View and manage stock levels per product and store."
        actions={
          <Button onClick={handleOpenAdd} leftIcon={<Plus className="h-5 w-5" />}>
            Add Stock
          </Button>
        }
      />

      {error && !isAddModalOpen && !isAdjustModalOpen && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
          <span className="font-semibold">Error:</span> {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading && stocks.length === 0 ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : stocks.length > 0 ? (
          <Table data={stocks} columns={columns} keyExtractor={(item) => item._id} />
        ) : (
          <EmptyState
            title="No stock records"
            description="Stock levels will appear here once products and stores are created."
            action={
              <Button onClick={handleOpenAdd} leftIcon={<Plus className="h-5 w-5" />}>
                Add Stock
              </Button>
            }
          />
        )}
      </div>

      {/* Add Stock Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Stock"
        footer={
          <>
            <Button
              type="submit"
              form="add-stock-form"
              isLoading={isLoading}
              className="w-full sm:w-auto sm:ml-3 min-w-[120px]"
            >
              Add Stock
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
              disabled={isLoading}
              className="mt-3 w-full sm:mt-0 sm:w-auto"
            >
              Cancel
            </Button>
          </>
        }
      >
        <form id="add-stock-form" className="space-y-4" onSubmit={handleAddSubmit}>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5 tracking-wide">
              Product
            </label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              className="block w-full rounded-xl border border-gray-200 shadow-sm px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm bg-gray-50/50 hover:bg-gray-50 text-gray-700"
            >
              <option value="" disabled>Select a product...</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>{p.name} ({p.sku})</option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5 tracking-wide">
              Store
            </label>
            <select
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              required
              className="block w-full rounded-xl border border-gray-200 shadow-sm px-4 py-2.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm bg-gray-50/50 hover:bg-gray-50 text-gray-700"
            >
              <option value="" disabled>Select a store...</option>
              {stores.map((s) => (
                <option key={s._id} value={s._id}>{s.name} — {s.location}</option>
              ))}
            </select>
          </div>

          <Input
            label="Initial Quantity"
            type="number"
            min="0"
            placeholder="e.g. 50"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </form>
      </Modal>

      {/* Adjust Stock Modal */}
      <Modal
        isOpen={isAdjustModalOpen}
        onClose={() => setIsAdjustModalOpen(false)}
        title="Adjust Stock Quantity"
        footer={
          <>
            <Button
              type="submit"
              form="adjust-stock-form"
              isLoading={isLoading}
              className="w-full sm:w-auto sm:ml-3 min-w-[120px]"
            >
              Update
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAdjustModalOpen(false)}
              disabled={isLoading}
              className="mt-3 w-full sm:mt-0 sm:w-auto"
            >
              Cancel
            </Button>
          </>
        }
      >
        <form id="adjust-stock-form" className="space-y-4" onSubmit={handleAdjustSubmit}>
          <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-700 font-medium border border-blue-100">
            Adjusting: {adjustLabel}
          </div>
          <Input
            label="New Quantity"
            type="number"
            min="0"
            placeholder="e.g. 100"
            value={adjustQty}
            onChange={(e) => setAdjustQty(e.target.value)}
            required
          />
        </form>
      </Modal>
    </div>
  );
}
