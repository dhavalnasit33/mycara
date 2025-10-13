import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus} from "lucide-react";
import { GenericTable } from "@/components/ui/adminTable";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  bulkDeleteCategories,
  deleteCategory,
  fetchCategories,
  updateCategoryStatus,
} from "@/features/categories/categoriesThunk";

export default function CategoriesPage() {
  const dispatch = useDispatch<AppDispatch>();

  const columns = [
    {
      key: "image_url",
      label: "Image",
      render: (item: any) =>
        item.image_url ? (
          <img
            src={`${import.meta.env.VITE_API_URL_IMAGE}${item.image_url}`}
            alt={item.name}
            className="h-10 w-10 rounded-md object-cover border"
          />
        ) : (
          <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs border border-dashed">
            —
          </div>
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
      filters={[
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ]}
      fetchData={async ({ page, limit, search, status }) => {
        try {
          const res = await dispatch(
            fetchCategories({ page, limit, search, status })
          ).unwrap();
          return { data: res.categories, total: res.total };
        } catch (err: any) {
          // ✅ throw the error so GenericTable's loadData can catch it
          throw new Error(err || "Failed to load categories");
        }
      }}
      deleteItem={async (id) => {
        try {
          await dispatch(deleteCategory(id)).unwrap();
        } catch (err: any) {
          throw new Error(err || "Failed to delete category");
        }
      }}
      bulkDeleteItems={async (ids) => {
        try {
          await dispatch(bulkDeleteCategories(ids)).unwrap();
        } catch (err: any) {
          throw new Error(err || "Failed to delete categories");
        }
      }}
      onStatusToggle={async (id, newStatus) => {
        try {
          await dispatch(
            updateCategoryStatus({
              id,
              status: newStatus ? "active" : "inactive",
            })
          ).unwrap();
        } catch (err: any) {
          throw new Error(err || "Failed to update status");
        }
      }}
      headerActions={
        <Link to="/categories/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        </Link>
      }
    />
  );
}
