import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { PageHeader } from "../components/common/PageHeader";
import { Table } from "../components/common/Table";
import type { Column } from "../components/common/Table";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { EmptyState } from "../components/common/EmptyState";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/product";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  const { products, isLoading, error, fetchProducts, addProduct, editProduct, removeProduct } = useProducts();

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpenCreate = () => {
    setEditId(null);
    setName("");
    setSku("");
    setDescription("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditId(product._id);
    setName(product.name);
    setSku(product.sku);
    setDescription(product.description || "");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, productName: string) => {
    if (window.confirm(`Are you sure you want to delete the product "${productName}"?`)) {
      const result = await removeProduct(id);
      if (result.success) {
        toast.success("Product deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete product");
      }
    }
  };

  const columns: Column<Product>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "SKU", accessorKey: "sku" },
    { header: "Description", accessorKey: "description" },
    {
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleOpenEdit(item)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit Product"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleDelete(item._id, item.name)}
            className="text-gray-400 hover:text-red-600 transition-colors"
            title="Delete Product"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedSku = sku.trim();

    if (!trimmedName || !trimmedSku) {
      toast.warning("Name and SKU are required.");
      return;
    }

    if (trimmedSku.length < 3) {
      toast.warning("SKU must be at least 3 characters long.");
      return;
    }

    const payload = { name: trimmedName, sku: trimmedSku, description: description.trim() };
    
    let result;
    if (editId) {
      result = await editProduct(editId, payload);
    } else {
      result = await addProduct(payload);
    }

    if (result.success) {
      toast.success(editId ? "Product updated successfully!" : "Product created successfully!");
      setIsModalOpen(false);
      setName("");
      setSku("");
      setDescription("");
      setEditId(null);
    } else {
      toast.error(result.error || (editId ? "Failed to update product" : "Failed to create product"));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Products"
        description="Manage your product catalog."
        actions={
          <Button onClick={handleOpenCreate} leftIcon={<Plus className="h-5 w-5" />}>
            Create Product
          </Button>
        }
      />

      {error && !isModalOpen && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg shadow-sm border border-red-200">
          <span className="font-semibold">Error:</span> {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading && products.length === 0 ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : products.length > 0 ? (
          <Table data={products} columns={columns} keyExtractor={(item) => item._id} />
        ) : (
          <EmptyState
            title="No products found"
            description="Get started by creating a new product."
            action={
              <Button onClick={handleOpenCreate} leftIcon={<Plus className="h-5 w-5" />}>
                Create Product
              </Button>
            }
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Edit Product" : "Create New Product"}
        footer={
          <>
            <Button 
              type="submit" 
              form="product-form"
              isLoading={isLoading}
              className="w-full sm:w-auto sm:ml-3 min-w-[120px]"
            >
              {editId ? "Save Changes" : "Save Product"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isLoading}
              className="mt-3 w-full sm:mt-0 sm:w-auto"
            >
              Cancel
            </Button>
          </>
        }
      >
        <form id="product-form" className="space-y-4" onSubmit={handleFormSubmit}>
          <Input 
            label="Product Name" 
            placeholder="e.g. Wireless Mouse" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
          <Input 
            label="SKU" 
            placeholder="e.g. WM-001" 
            value={sku} 
            onChange={(e) => setSku(e.target.value)} 
            required
          />
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border transition-shadow duration-200 ease-in-out"
              rows={3}
              placeholder="Brief product description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </form>
      </Modal>
    </div>
  );
}
