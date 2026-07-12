import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";
import { Table } from "../components/common/Table";
import type { Column } from "../components/common/Table";
import { Button } from "../components/common/Button";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { EmptyState } from "../components/common/EmptyState";

export default function Stores() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  interface Store {
    id: string;
    name: string;
    location: string;
    contact: string;
  }

  const data: Store[] = [];

  const columns: Column<Store>[] = [
    { header: "Store Name", accessorKey: "name" },
    { header: "Location", accessorKey: "location" },
    { header: "Contact Info", accessorKey: "contact" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Stores"
        description="Manage your store locations."
        actions={
          <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="h-5 w-5" />}>
            Create Store
          </Button>
        }
      />

      {data.length > 0 ? (
        <Table data={data} columns={columns} keyExtractor={(item) => item.id} />
      ) : (
        <EmptyState
          title="No stores found"
          description="Get started by adding a new store location."
          action={
            <Button onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="h-5 w-5" />}>
              Create Store
            </Button>
          }
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Store"
      >
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Store Name" placeholder="e.g. Downtown Branch" />
          <Input label="Location (Address)" placeholder="e.g. 123 Main St, City" />
          <Input label="Contact Info" placeholder="e.g. contact@store.com" />
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Button type="submit" className="sm:col-start-2">
              Save Store
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
