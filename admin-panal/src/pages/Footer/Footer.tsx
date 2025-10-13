import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { GenericTable } from "@/components/ui/adminTable";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  fetchFooter,
  deleteFooterItem,
  bulkDeleteFooterItems,
  updateFooterItemStatus,
} from "@/features/footer/footerThunk";

export default function FooterPage() {
  const dispatch = useDispatch<AppDispatch>();

  const columns = [
    { key: "label", label: "Label", width: "w-48" },
    { key: "url", label: "URL", width: "w-64" },
  
  ];

  return (
    <GenericTable
      title="Footer Items"
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
            fetchFooter({ page, limit, search, status })
          ).unwrap();
          return { data: res.footers, total: res.total };
        } catch (err: any) {
          throw new Error(err || "Failed to load footer items");
        }
      }}
      deleteItem={async (id) => {
        try {
          await dispatch(deleteFooterItem(id)).unwrap();
        } catch (err: any) {
          throw new Error(err || "Failed to delete footer item");
        }
      }}
      bulkDeleteItems={async (ids) => {
        try {
          await dispatch(bulkDeleteFooterItems(ids)).unwrap();
        } catch (err: any) {
          throw new Error(err || "Failed to delete footer items");
        }
      }}
      onStatusToggle={async (id, newStatus) => {
        try {
          await dispatch(
            updateFooterItemStatus({
              id,
              status: newStatus ? "active" : "inactive",
            })
          ).unwrap();
        } catch (err: any) {
          throw new Error(err || "Failed to update status");
        }
      }}
      headerActions={
        <Link to="/footer/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Footer Item
          </Button>
        </Link>
      }
    />
  );
}
