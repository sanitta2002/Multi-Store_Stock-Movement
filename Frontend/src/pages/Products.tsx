import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";
import { Table } from "../components/common/Table";
import type { Column } from "../components/common/Table";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { EmptyState } from "../components/common/EmptyState";

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  interface Product {
    id: string;
    name: string;
    sku: string;
    price: number;
    description: string;
  }

  // We are not adding dummy data as requested, just the UI structure.
  const data: Product[] = [];

  const columns: Column<Product>[] = [
    { header: "Name", accessorKey: "name" },
    { header: "SKU", accessorKey: "sku" },
    { header: "Base Price", accessorKey: "price" },
    { header: "Description", accessorKey: "description" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Products"
        description="Manage your product catalog."
        actions={
          <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="h-5 w-5" />}>
            Create Product
          </Button>
        }
      />

      {data.length > 0 ? (
        <Table data={data} columns={columns} keyExtractor={(item) => item.id} />
      ) : (
        <EmptyState
          title="No products found"
          description="Get started by creating a new product."
          action={
            <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="h-5 w-5" />}>
              Create Product
            </Button>
          }
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Product"
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Product Name" placeholder="e.g. Wireless Mouse" />
          <Input label="SKU" placeholder="e.g. WM-001" />
          <Input label="Base Price ($)" type="number" step="0.01" placeholder="e.g. 29.99" />
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border"
              rows={3}
              placeholder="Product description..."
            ></textarea>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button type="submit" className="sm:col-start-2">
              Save Product
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="mt-3 sm:col-start-1 sm:mt-0"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
