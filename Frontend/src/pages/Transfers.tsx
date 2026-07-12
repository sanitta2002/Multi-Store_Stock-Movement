import { useState } from "react";
import { ArrowRightLeft } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";
import { Table } from "../components/common/Table";
import type { Column } from "../components/common/Table";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { EmptyState } from "../components/common/EmptyState";

export default function Transfers() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  interface Transfer {
    id: string;
    productName: string;
    sourceStore: string;
    destStore: string;
    quantity: number;
    date: string;
    status: string;
  }

  // We are not adding dummy data as requested, just the UI structure.
  const data: Transfer[] = [];

  const columns: Column<Transfer>[] = [
    { header: "Product", accessorKey: "productName" },
    { header: "From Store", accessorKey: "sourceStore" },
    { header: "To Store", accessorKey: "destStore" },
    { header: "Quantity", accessorKey: "quantity" },
    { header: "Date", accessorKey: "date" },
    { header: "Status", accessorKey: "status" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Stock Transfers"
        description="Transfer stock between different stores."
        actions={
          <Button onClick={() => setIsModalOpen(true)} leftIcon={<ArrowRightLeft className="h-5 w-5" />}>
            New Transfer
          </Button>
        }
      />

      {data.length > 0 ? (
        <Table data={data} columns={columns} keyExtractor={(item) => item.id} />
      ) : (
        <EmptyState
          title="No transfers found"
          description="Initiate a transfer to move stock between locations."
          action={
            <Button onClick={() => setIsModalOpen(true)} leftIcon={<ArrowRightLeft className="h-5 w-5" />}>
              New Transfer
            </Button>
          }
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Transfer Stock"
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="w-full">
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Product
             </label>
             <select className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border bg-white">
               <option value="" disabled selected>Select a product</option>
               {/* Options would be mapped here */}
             </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
               <label className="block text-sm font-medium text-gray-700 mb-1">
                 Source Store
               </label>
               <select className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border bg-white">
                 <option value="" disabled selected>Select source</option>
                 {/* Options would be mapped here */}
               </select>
            </div>
            <div className="w-full">
               <label className="block text-sm font-medium text-gray-700 mb-1">
                 Destination Store
               </label>
               <select className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border bg-white">
                 <option value="" disabled selected>Select destination</option>
                 {/* Options would be mapped here */}
               </select>
            </div>
          </div>

          <Input label="Quantity to Transfer" type="number" min="1" placeholder="e.g. 10" />

          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button type="submit" className="sm:col-start-2">
              Confirm Transfer
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
