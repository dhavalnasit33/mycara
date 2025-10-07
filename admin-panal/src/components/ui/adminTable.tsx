import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
}

interface GenericTableProps<T> {
  title: string;
  fetchData: (params: any) => Promise<{ data: T[]; total: number }>;
  deleteItem?: (id: string) => Promise<any>;
  bulkDeleteItems?: (ids: string[]) => Promise<any>;
  columns: Column<T>[];
  rowKey: keyof T;
  searchEnabled?: boolean;
  filters?: { label: string; value: string }[];
  headerActions?: React.ReactNode;
  pageSize?: number;
  rowActions?: (item: T) => React.ReactNode;
  statusToggleEnabled?: boolean;
  onStatusToggle?: (id: string, newStatus: boolean) => Promise<void>;
}

export function GenericTable<T extends Record<string, any>>({
  title,
  fetchData,
  deleteItem,
  bulkDeleteItems,
  columns,
  rowKey,
  searchEnabled = true,
  filters,
  headerActions,
  pageSize = 10,
  rowActions,
  onStatusToggle,
  statusToggleEnabled = false,
}: GenericTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Load data
  const loadData = async () => {
    setLoading(true);
    try {
      const result = await fetchData({
        page,
        limit: pageSize,
        search: debouncedQuery,
        status: statusFilter,
      });
      setData(result.data || []);
      setTotal(result.total || 0);
    } catch (err: any) {
      toast.error(err?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [debouncedQuery, page, statusFilter]);

  const handleDelete = async (id: string) => {
    if (!deleteItem) return;
    try {
      await deleteItem(id);
      toast.success("Deleted successfully");
      setSelectedIds((prev) => prev.filter((i) => i !== id));
      loadData();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete item");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length || !bulkDeleteItems) return;
    try {
      await bulkDeleteItems(selectedIds);
      toast.success(`${selectedIds.length} items deleted`);
      setSelectedIds([]);
      loadData();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete items");
    }
  };

  const handleStatusToggle = async (item: any) => {
    if (!onStatusToggle) return;
    const newStatus = item.status !== "active";
    try {
      await onStatusToggle(item[rowKey], newStatus);
      toast.success(`Status updated to ${newStatus ? "Active" : "Inactive"}`);
      loadData();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update status");
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-gray-500 mt-1">
            Manage and organize your {title.toLowerCase()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {headerActions}
          <Button variant="outline" onClick={async () => {
            const result = await fetchData({ isDownload: true });
            const exportData = (result.data || []).map((item: any) =>
              columns.reduce((acc, col) => {
                acc[col.label] = col.render ? col.render(item) : item[col.key];
                return acc;
              }, {} as Record<string, any>)
            );
            const ws = XLSX.utils.json_to_sheet(exportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, title);
            const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            saveAs(new Blob([buf]), `${title}_${Date.now()}.xlsx`);
          }}>
            Export
          </Button>
          {bulkDeleteItems && selectedIds.length > 0 && (
            <ConfirmDialog
              title="Delete Selected"
              description={`Delete ${selectedIds.length} selected items?`}
              confirmText="Delete All"
              onConfirm={handleBulkDelete}
              danger
            >
              <Button variant="destructive">Delete Selected</Button>
            </ConfirmDialog>
          )}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-2 items-center">
        {searchEnabled && (
          <Input
            placeholder={`Search ${title}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        )}
       {filters && (
  <Select
  value={statusFilter || "all"}
  onValueChange={(val) => setStatusFilter(val === "all" ? "" : val)}
>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Filter by status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All</SelectItem>
    {filters.map((f) => (
      <SelectItem key={f.value} value={f.value}>
        {f.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

)}

      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-gray-50">
            <tr>
              {bulkDeleteItems && <th className="w-10 p-3 text-center">
                <Checkbox
                  checked={selectedIds.length === data.length && data.length > 0}
                  onCheckedChange={(checked) =>
                    setSelectedIds(checked ? data.map((d) => d[rowKey] as string) : [])
                  }
                />
              </th>}
              {columns.map((col) => (
                <th key={col.key} className={`p-3 text-left ${col.width || ""}`}>{col.label}</th>
              ))}
              {statusToggleEnabled && <th className="w-20 p-3 text-center">Status</th>}
              <th className="w-20 p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length + 3} className="p-6 text-center text-gray-500">Loading...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length + 3} className="p-6 text-center text-gray-500">No records found</td></tr>
            ) : (
              data.map((item) => (
                <tr key={item[rowKey]} className="hover:bg-gray-50">
                  {bulkDeleteItems && (
                    <td className="p-3 text-center">
                      <Checkbox
                        checked={selectedIds.includes(item[rowKey] as string)}
                        onCheckedChange={() =>
                          setSelectedIds((prev) =>
                            prev.includes(item[rowKey] as string)
                              ? prev.filter((i) => i !== item[rowKey])
                              : [...prev, item[rowKey] as string]
                          )
                        }
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="p-3 truncate">
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                  {statusToggleEnabled && (
                    <td className="p-3 text-center">
                      <Switch
                        checked={item.status === "active"}
                        onCheckedChange={() => handleStatusToggle(item)}
                      />
                    </td>
                  )}
                  <td className="p-3 text-right">
                    {rowActions ? rowActions(item) : (
                      <div className="flex justify-end gap-2">
                        <Link to={`/categories/${item._id}/edit`}>
                          <Edit className="w-4 h-4 text-blue-600 hover:text-blue-800" />
                        </Link>
                        <ConfirmDialog
                          title="Delete Item"
                          description={`Are you sure you want to delete "${item.name || item.title}"?`}
                          confirmText="Delete"
                          onConfirm={() => handleDelete(item[rowKey] as string)}
                          danger
                        >
                          <button>
                            <Trash className="w-4 h-4 text-red-600 hover:text-red-800" />
                          </button>
                        </ConfirmDialog>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4">
          <Button size="sm" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>Prev</Button>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              size="sm"
              variant={page === i + 1 ? "default" : "outline"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button size="sm" onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next</Button>
        </div>
      )}
    </div>
  );
}
