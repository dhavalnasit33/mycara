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
  fetchSections,
  deleteSection,
  bulkDeleteSections,
} from "@/features/sections/sectionsThunk";

export default function Sections() {
  const dispatch = useDispatch<AppDispatch>();
  const { sections, total, loading } = useSelector(
    (state: RootState) => state.sections
  );

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

  // Fetch sections
  useEffect(() => {
    dispatch(fetchSections({ page, limit, search: debouncedQuery }));
  }, [debouncedQuery, page, dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteSection(id)).unwrap();
      toast.success("Section deleted successfully.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete section.");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    try {
      await dispatch(bulkDeleteSections(selectedIds)).unwrap();
      toast.success(`${selectedIds.length} sections deleted successfully.`);
      setSelectedIds([]);
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete sections.");
    }
  };

  const handleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const handleDownload = async () => {
    try {
      const result = await dispatch(
        fetchSections({ page: 1, limit: 1000, search: debouncedQuery })
      ).unwrap();

      const data = result.sections.map((s: any) => ({
        Title: s.title,
        Description: s.description || "-",
        Order: s.order ?? "-",
        Button: s.is_button ? `${s.button_name} (${s.button_link})` : "No",
        Status: s.status,
        "Created At": s.createdAt
          ? new Date(s.createdAt).toLocaleDateString()
          : "-",
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sections");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(blob, `sections_${Date.now()}.xlsx`);
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

  if (loading) return <div>Loading sections...</div>;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-8 p-6 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Sections
          </h1>
          <p className="text-sm text-gray-500">Manage your sections</p>
        </div>
        <div className="flex gap-2">
          <Link to="/sections/add">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Section
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
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {selectedIds.length > 0 && (
            <ConfirmDialog
              title="Delete Selected Sections"
              description={`This will delete ${selectedIds.length} selected sections.`}
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

      {/* Sections Table */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Sections{" "}
            <span className="text-gray-400 font-normal">({total})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-50 text-gray-700 text-sm font-medium">
                <tr>
                  <th className="p-3 text-left min-w-[40px]">
                    <Checkbox
                      checked={
                        selectedIds.length === sections.length &&
                        sections.length > 0
                      }
                      onCheckedChange={(checked) =>
                        setSelectedIds(
                          checked ? sections.map((s) => s._id) : []
                        )
                      }
                    />
                  </th>
                  <th className="p-3 text-left min-w-[150px]">Title</th>
                  <th className="p-3 text-left min-w-[200px]">Description</th>
                  <th className="p-3 text-left min-w-[60px]">Order</th>
                  <th className="p-3 text-left min-w-[150px]">Button</th>
                  <th className="p-3 text-left min-w-[100px]">Status</th>
                  <th className="p-3 text-left min-w-[120px]">Created At</th>
                  <th className="p-3 text-right min-w-[100px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sections.map((section) => (
                  <tr
                    key={section._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3">
                      <Checkbox
                        checked={selectedIds.includes(section._id)}
                        onCheckedChange={() => handleSelect(section._id)}
                      />
                    </td>
                    <td className="p-3 font-medium text-gray-900 truncate">
                      {section.title}
                    </td>
                    <td className="p-3 text-gray-700 truncate">
                      {section.description || "-"}
                    </td>
                    <td className="p-3 text-center">{section.order ?? "-"}</td>
                    <td className="p-3 truncate">
                      {section.is_button
                        ? `${section.button_name} (${section.button_link})`
                        : "No"}
                    </td>
                    <td className="p-3">
                      {getStatusBadge(section.status || "inactive")}
                    </td>
                    <td className="p-3">
                      {new Date(section.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 flex justify-end gap-2">
                      <Link
                        to={`/sections/${section._id}/edit`}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <ConfirmDialog
                        title="Delete Section"
                        description={`This will permanently delete section "${section.title}".`}
                        confirmText="Delete"
                        onConfirm={() => handleDelete(section._id)}
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
