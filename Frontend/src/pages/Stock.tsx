import { useState } from "react";
import { Edit2 } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";
import { Table } from "../components/common/Table";
import type { Column } from "../components/common/Table";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { EmptyState } from "../components/common/EmptyState";

export default function Stock() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  interface StockItem {
    id: string;
    productName: string;
    storeName: string;
    quantity: number;
  }

  // We are not adding dummy data as requested, just the UI structure.
  const data: StockItem[] = [];

  const columns: Column<StockItem>[] = [
    { header: "Product", accessorKey: "productName" },
    { header: "Store", accessorKey: "storeName" },
    { header: "Quantity", accessorKey: "quantity" },
    { 
      header: "Actions", 
      cell: () => (
        <Button 
          variant="ghost" 
          size="sm" 
          leftIcon={<Edit2 className="h-4 w-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Adjust
        </Button>
      )
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Stock Inventory"
        description="View and adjust stock levels per store."
      />

      {data.length > 0 ? (
        <Table data={data} columns={columns} keyExtractor={(item) => item.id} />
      ) : (
        <EmptyState
          title="No stock records"
          description="Stock levels will appear here once products and stores are created."
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Adjust Stock Level"
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4 text-sm text-gray-500">
            Adjusting stock for selected product at selected store.
          </div>
          <Input label="New Quantity" type="number" min="0" placeholder="e.g. 50" />
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason (Optional)
            </label>
            <textarea
              className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border"
              rows={2}
              placeholder="e.g. Restock from supplier..."
            ></textarea>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button type="submit" className="sm:col-start-2">
              Update Stock
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
