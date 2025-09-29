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
import { bulkDeleteFabrics, deleteFabric, fetchFabrics } from "@/features/fabrics/fabricsThunk";

export default function Fabrics() {
  const dispatch = useDispatch<AppDispatch>();
  const { fabrics, total, loading } = useSelector((state: RootState) => state.fabrics);

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

  // Fetch fabrics
  useEffect(() => {
    dispatch(fetchFabrics({ page, limit, search: debouncedQuery }));
  }, [debouncedQuery, page, dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteFabric(id)).unwrap();
      toast.success("The fabric has been removed successfully.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete fabric. Please try again.");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    try {
      await dispatch(bulkDeleteFabrics(selectedIds)).unwrap();
      toast.success(`${selectedIds.length} fabrics were removed successfully.`);
      setSelectedIds([]);
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete fabrics. Please try again.");
    }
  };

  const handleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const handleDownload = async () => {
    try {
      const result = await dispatch(fetchFabrics({ isDownload: true })).unwrap();
      const data = result.fabrics.map((f: any) => ({
        Name: f.name,
        Description: f.description || "-",
        Status: f.status,
        CreatedAt: new Date(f.createdAt).toLocaleString(),
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Fabrics");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, `fabrics_${Date.now()}.xlsx`);
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

  if (loading) return <div>Loading fabrics...</div>;

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-8 p-6 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Fabrics
          </h1>
          <p className="text-sm text-gray-500">Manage your fabrics</p>
        </div>
        <div className="flex gap-2">
          <Link to="/fabrics/add">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Fabric
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

      {/* Search & Bulk Actions */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search fabrics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {selectedIds.length > 0 && (
            <ConfirmDialog
              title="Delete Selected Fabrics"
              description={`This will delete ${selectedIds.length} selected fabrics.`}
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

      {/* Fabrics Table */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Fabrics <span className="text-gray-400 font-normal">({total})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm table-fixed">
              <thead className="bg-gray-50 text-gray-700 text-sm font-medium">
                <tr>
                  <th className="p-3 w-10 text-left">
                    <Checkbox
                      checked={selectedIds.length === fabrics.length && fabrics.length > 0}
                      onCheckedChange={(checked) =>
                        setSelectedIds(checked ? fabrics.map((f) => f._id) : [])
                      }
                    />
                  </th>
                  <th className="p-3 w-20 text-left">Image</th>
                  <th className="p-3 w-48 text-left">Name</th>
                  <th className="p-3 w-32 text-left">Status</th>
                  <th className="p-3 w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {fabrics.map((fabric) => (
                  <tr key={fabric._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3">
                      <Checkbox
                        checked={selectedIds.includes(fabric._id)}
                        onCheckedChange={() => handleSelect(fabric._id)}
                      />
                    </td>
                    <td className="p-3">
                      {fabric.image_url ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL_IMAGE}${fabric.image_url}`}
                          alt={fabric.name}
                          className="h-10 w-10 rounded-md object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs border border-dashed border-gray-300">
                          —
                        </div>
                      )}
                    </td>
                    <td className="p-3 font-medium text-gray-900 truncate">
                      {fabric.name}
                    </td>
                    <td className="p-3">{getStatusBadge(fabric.status)}</td>
                    <td className="p-3 flex justify-end gap-2">
                      <Link
                        to={`/fabrics/${fabric._id}/edit`}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>

                      <ConfirmDialog
                        title="Delete Fabric"
                        description={`This will permanently delete fabric "${fabric.name}".`}
                        confirmText="Delete"
                        onConfirm={() => handleDelete(fabric._id)}
                        danger
                      >
                        <button className="p-1 text-red-600 hover:bg-red-50 rounded-md transition">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </ConfirmDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-2 mt-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
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
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
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
