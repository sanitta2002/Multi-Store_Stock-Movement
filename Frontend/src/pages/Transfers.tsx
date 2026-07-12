import { useState, useEffect } from "react";
import { ArrowRightLeft } from "lucide-react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/common/PageHeader";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useProducts } from "../hooks/useProducts";
import { useStores } from "../hooks/useStores";
import { executeTransfer } from "../services/transferService";

export default function Transfers() {
  const { products, fetchProducts } = useProducts();
  const { stores, fetchStores } = useStores();

  const [productId, setProductId] = useState("");
  const [fromStoreId, setFromStoreId] = useState("");
  const [toStoreId, setToStoreId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchStores();
  }, [fetchProducts, fetchStores]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productId) {
      toast.warning("Please select a product.");
      return;
    }
    if (!fromStoreId || !toStoreId) {
      toast.warning("Please select both source and destination stores.");
      return;
    }
    if (fromStoreId === toStoreId) {
      toast.warning("Source and destination stores cannot be the same.");
      return;
    }
    const qty = Number(quantity);
    if (!quantity || isNaN(qty) || qty <= 0) {
      toast.warning("Transfer quantity must be greater than zero.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await executeTransfer({ productId, fromStoreId, toStoreId, quantity: qty });
      toast.success(result.message || "Stock transferred successfully!");
      // Reset form
      setProductId("");
      setFromStoreId("");
      setToStoreId("");
      setQuantity("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Transfer failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <PageHeader
        title="Stock Transfers"
        description="Move stock inventory directly between store locations."
      />

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:px-8 text-white flex items-center gap-3">
          <ArrowRightLeft className="h-6 w-6 text-blue-100" />
          <h2 className="text-xl font-semibold tracking-wide">Execute Transfer</h2>
        </div>
        
        <form className="p-6 sm:p-8 space-y-6" onSubmit={handleTransfer}>
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-sm text-blue-800">
            <span className="font-semibold text-blue-900">Note:</span> Transfers occur instantly. Ensure the source store has sufficient stock available before proceeding.
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-slate-700 mb-2 tracking-wide">
              Product
            </label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              className="block w-full rounded-xl border border-slate-200 shadow-sm px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm bg-slate-50/50 hover:bg-slate-50 transition-all text-slate-700"
            >
              <option value="" disabled>Select the product to transfer...</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>{p.name} ({p.sku})</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            <div className="w-full">
              <label className="block text-sm font-medium text-slate-700 mb-2 tracking-wide">
                From Store (Source)
              </label>
              <select
                value={fromStoreId}
                onChange={(e) => setFromStoreId(e.target.value)}
                required
                className="block w-full rounded-xl border border-slate-200 shadow-sm px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm bg-slate-50/50 hover:bg-slate-50 transition-all text-slate-700"
              >
                <option value="" disabled>Select source store...</option>
                {stores.map((s) => (
                  <option key={s._id} value={s._id}>{s.name} — {s.location}</option>
                ))}
              </select>
            </div>

            <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none mt-6">
              <div className="bg-white p-2 rounded-full shadow-sm border border-slate-100">
                <ArrowRightLeft className="h-5 w-5 text-slate-400" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-slate-700 mb-2 tracking-wide">
                To Store (Destination)
              </label>
              <select
                value={toStoreId}
                onChange={(e) => setToStoreId(e.target.value)}
                required
                className="block w-full rounded-xl border border-slate-200 shadow-sm px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 sm:text-sm bg-slate-50/50 hover:bg-slate-50 transition-all text-slate-700"
              >
                <option value="" disabled>Select destination store...</option>
                {stores.map((s) => (
                  <option key={s._id} value={s._id}>{s.name} — {s.location}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <Input 
              label="Transfer Quantity" 
              type="number" 
              min="1" 
              placeholder="e.g. 10" 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button 
              type="submit" 
              isLoading={isSubmitting} 
              className="w-full sm:w-auto min-w-[200px]"
              leftIcon={!isSubmitting ? <ArrowRightLeft className="h-4 w-4" /> : undefined}
            >
              Confirm Transfer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
