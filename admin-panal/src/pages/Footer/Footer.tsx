import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit2, Trash2, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { AppDispatch, RootState } from "@/store";
import { Checkbox } from "@/components/ui/checkbox";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import { toast } from "sonner";
import {
  bulkDeleteFooterItems,
  deleteFooterItem,
  fetchFooter,
} from "@/features/footer/footerThunk";

export default function Footer() {
  const dispatch = useDispatch<AppDispatch>();
  const { footers, total, loading } = useSelector((state: RootState) => state.footer);

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch footer items
  useEffect(() => {
    dispatch(fetchFooter({ page, limit, search: debouncedQuery }));
  }, [debouncedQuery, page, dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteFooterItem(id)).unwrap();
      toast.success("Footer item deleted successfully.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete footer item.");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    try {
      await dispatch(bulkDeleteFooterItems(selectedIds)).unwrap();
      toast.success(`${selectedIds.length} footer items deleted successfully.`);
      setSelectedIds([]);
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete footer items.");
    }
  };

  const handleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const handleDownload = async () => {
    try {
      const result = await dispatch(
        fetchFooter({ page: 1, limit: 1000, search: debouncedQuery })
      ).unwrap();

      const data = result.footers.map((item: any) => ({
        Label: item.label,
        URL: item.url,
        Order: item.order ?? "-",
        Status: item.status,
        "Created At": item.createdAt
          ? new Date(item.createdAt).toLocaleDateString()
          : "-",
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Footer Items");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, `footer_${Date.now()}.xlsx`);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const getStatusBadge = (status: string) => (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        status === "active"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  if (loading) return <div>Loading footer items...</div>;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-8 p-6 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Footer</h1>
          <p className="text-sm text-gray-500">Manage your footer items</p>
        </div>
        <div className="flex gap-2">
          <Link to="/footer/add">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Footer Item
            </Button>
          </Link>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Search & Bulk Delete */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search footer items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {selectedIds.length > 0 && (
            <ConfirmDialog
              title="Delete Selected Footer Items"
              description={`This will delete ${selectedIds.length} selected footer items.`}
              confirmText="Delete All"
              onConfirm={handleBulkDelete}
              danger
            >
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" /> Delete Selected
              </Button>
            </ConfirmDialog>
          )}
        </CardContent>
      </Card>

      {/* Footer Table */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Footer Items <span className="text-gray-400 font-normal">({total})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm table-fixed border-collapse">
              <thead className="bg-gray-50 text-gray-700 text-sm font-medium">
                <tr>
                  <th className="p-3 text-center w-10">
                    <Checkbox
                      checked={selectedIds.length === footers.length && footers.length > 0}
                      onCheckedChange={(checked) =>
                        setSelectedIds(checked ? footers.map((n) => n._id) : [])
                      }
                    />
                  </th>
                  <th className="p-3 text-left w-40">Label</th>
                  <th className="p-3 text-left w-40">URL</th>
       
                  <th className="p-3 text-center w-20">Status</th>
                  <th className="p-3 text-center w-32">Created At</th>
                  <th className="p-3 text-center w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {footers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-gray-500">
                      No footer items found.
                    </td>
                  </tr>
                ) : (
                  footers.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-center">
                        <Checkbox
                          checked={selectedIds.includes(item._id)}
                          onCheckedChange={() => handleSelect(item._id)}
                        />
                      </td>
                      <td className="p-3 text-left font-medium">{item.label}</td>
                      <td className="p-3 text-left">{item.url}</td>
                      <td className="p-3 text-center">{getStatusBadge(item.status || "inactive")}</td>
                      <td className="p-3 text-center">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="p-3 text-center flex justify-center gap-2">
                        <Link
                          to={`/footer/${item._id}/edit`}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <ConfirmDialog
                          title="Delete Footer Item"
                          description={`This will permanently delete footer item "${item.label}".`}
                          confirmText="Delete"
                          onConfirm={() => handleDelete(item._id)}
                          danger
                        >
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded-md transition">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </ConfirmDialog>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Prev
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded-md text-sm ${
                    page === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
