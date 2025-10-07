import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash } from "lucide-react";
import { GenericTable } from "@/components/ui/adminTable";
import { ConfirmDialog } from "@/components/ui/confirmDialog";

export default function CategoriesPage() {
  const columns = [
    {
      key: "image_url",
      label: "Image",
      render: (item: any) => item.image_url ? (
        <img
          src={`${import.meta.env.VITE_API_URL_IMAGE}${item.image_url}`}
          alt={item.name}
          className="h-10 w-10 rounded-md object-cover border"
        />
      ) : (
        <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs border border-dashed">—</div>
      ),
      width: "w-20",
    },
    { key: "name", label: "Name", width: "w-48" },
    {
      key: "parent_id",
      label: "Parent",
      render: (item: any) => item.parent_id?.name || "-",
      width: "w-48",
    },
  ];

  return (
    <GenericTable
      title="Categories"
      columns={columns}
      rowKey="_id"
      searchEnabled
      statusToggleEnabled
      onStatusToggle={async (id, newStatus) => {
        // ✅ call your API or Redux thunk here
        await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus ? "active" : "inactive" }),
        });
      }}
      filters={[
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ]}
      fetchData={async ({ page, limit, search, status }) => {
        const query = new URLSearchParams({ page, limit, search: search || "", status: status || "" });
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories?${query.toString()}`);
        const json = await res.json();
        return { data: json.data.categories, total: json.data.total };
      }}
      deleteItem={async (id) => {
        await fetch(`${import.meta.env.VITE_API_URL}/categories/${id}`, { method: "DELETE" });
      }}
      bulkDeleteItems={async (ids) => {
        await fetch(`${import.meta.env.VITE_API_URL}/categories/bulk-delete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids }),
        });
      }}
      headerActions={
        <Link to="/categories/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        </Link>
      }
      rowActions={(item: any) => (
        <div className="flex gap-2 justify-end">
          <Link to={`/categories/${item._id}/edit`}>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Edit className="h-3 w-3" />
            </Button>
          </Link>
          <ConfirmDialog
            title="Delete Item"
            description={`Are you sure you want to delete "${item.name}"?`}
            confirmText="Delete"
            onConfirm={async () => {
              await fetch(`${import.meta.env.VITE_API_URL}/categories/${item._id}`, { method: "DELETE" });
              // refresh table after delete
              window.location.reload();
            }}
            danger
          >
            <Button variant="destructive" size="sm" className="flex items-center gap-1">
              <Trash className="h-2 w-2" /> 
            </Button>
          </ConfirmDialog>
        </div>
      )}
    />
  );
}
