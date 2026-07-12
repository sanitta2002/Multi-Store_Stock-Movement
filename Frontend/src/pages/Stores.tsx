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
import { useStores } from "../hooks/useStores";
import type { Store } from "../types/store";

export default function Stores() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const { stores, isLoading, error, fetchStores, addStore, editStore, removeStore } = useStores();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const handleOpenCreate = () => {
    setEditId(null);
    setName("");
    setLocation("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (store: Store) => {
    setEditId(store._id);
    setName(store.name);
    setLocation(store.location);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, storeName: string) => {
    if (window.confirm(`Are you sure you want to delete the store "${storeName}"?`)) {
      const result = await removeStore(id);
      if (result.success) {
        toast.success("Store deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete store");
      }
    }
  };

  const columns: Column<Store>[] = [
    { header: "Store Name", accessorKey: "name" },
    { header: "Location", accessorKey: "location" },
    {
      header: "Actions",
      cell: (item) => (
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => handleOpenEdit(item)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit Store"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleDelete(item._id, item.name)}
            className="text-gray-400 hover:text-red-600 transition-colors"
            title="Delete Store"
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
    const trimmedLocation = location.trim();

    if (!trimmedName || !trimmedLocation) {
      toast.warning("Name and Location are required.");
      return;
    }

    const payload = { name: trimmedName, location: trimmedLocation };
    
    let result;
    if (editId) {
      result = await editStore(editId, payload);
    } else {
      result = await addStore(payload);
    }

    if (result.success) {
      toast.success(editId ? "Store updated successfully!" : "Store created successfully!");
      setIsModalOpen(false);
      setName("");
      setLocation("");
      setEditId(null);
    } else {
      toast.error(result.error || (editId ? "Failed to update store" : "Failed to create store"));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Stores"
        description="Manage your store locations."
        actions={
          <Button onClick={handleOpenCreate} leftIcon={<Plus className="h-5 w-5" />}>
            Create Store
          </Button>
        }
      />

      {error && !isModalOpen && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg shadow-sm border border-red-200">
          <span className="font-semibold">Error:</span> {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading && stores.length === 0 ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : stores.length > 0 ? (
          <Table data={stores} columns={columns} keyExtractor={(item) => item._id} />
        ) : (
          <EmptyState
            title="No stores found"
            description="Get started by adding a new store location."
            action={
              <Button onClick={handleOpenCreate} leftIcon={<Plus className="h-5 w-5" />}>
                Create Store
              </Button>
            }
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editId ? "Edit Store" : "Create New Store"}
        footer={
          <>
            <Button 
              type="submit" 
              form="store-form"
              isLoading={isLoading}
              className="w-full sm:w-auto sm:ml-3 min-w-[120px]"
            >
              {editId ? "Save Changes" : "Save Store"}
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
        <form id="store-form" className="space-y-4" onSubmit={handleFormSubmit}>
          <Input 
            label="Store Name" 
            placeholder="e.g. Downtown Branch" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
          <Input 
            label="Location (Address)" 
            placeholder="e.g. 123 Main St, City" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required
          />
        </form>
      </Modal>
    </div>
  );
}
