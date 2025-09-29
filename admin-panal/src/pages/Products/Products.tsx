import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit2, Trash2, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { Checkbox } from "@/components/ui/checkbox";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import { toast } from "sonner";
import {
  bulkDeleteProducts,
  deleteProduct,
  fetchProducts,
} from "@/features/products/productsThunk";

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, total, loading } = useSelector(
    (state: RootState) => state.products
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

  useEffect(() => {
    dispatch(fetchProducts({ page, limit, search: debouncedQuery }));
  }, [debouncedQuery, page, dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      toast.success("Product deleted successfully.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete product.");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;

    try {
      await dispatch(bulkDeleteProducts(selectedIds)).unwrap();
      toast.success(`${selectedIds.length} products deleted successfully.`);
      setSelectedIds([]);
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete products.");
    }
  };

  const handleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const handleDownload = async () => {
    try {
      const result = await dispatch(
        fetchProducts({ isDownload: true })
      ).unwrap();
      const data = result.products.map((p: any) => ({
        Name: p.name,
        Category: typeof p.category_id === "object" ? p.category_id.name : "-",
        Brand: typeof p.brand_id === "object" ? p.brand_id.name : "-",
        Type: typeof p.type_id === "object" ? p.type_id.name : "-",
        Fabric: typeof p.fabric_id === "object" ? p.fabric_id.name : "-",
        Status: p.status,
        "Created At": new Date(p.createdAt).toLocaleString(),
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(blob, `products_${Date.now()}.xlsx`);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const totalPages = Math.ceil(total / limit);

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="space-y-8 p-6 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Products
          </h1>
          <p className="text-sm text-gray-500">
            Manage your products and their details.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/products/add">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Product
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
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {selectedIds.length > 0 && (
            <ConfirmDialog
              title="Delete Selected Products"
              description={`This will delete ${selectedIds.length} selected products.`}
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

      {/* Products Table */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Products{" "}
            <span className="text-gray-400 font-normal">({total})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm table-fixed">
              <thead className="bg-gray-50 text-gray-700 text-sm font-medium">
                <tr>
                  <th className="p-3 w-10 text-left">
                    <Checkbox
                      checked={
                        selectedIds.length === products.length &&
                        products.length > 0
                      }
                      onCheckedChange={(checked) =>
                        setSelectedIds(
                          checked ? products.map((p) => p._id) : []
                        )
                      }
                    />
                  </th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Brand</th>
                  <th className="p-3 text-left">Types</th>
                  <th className="p-3 text-left">Fabric</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 w-24 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <React.Fragment key={product._id}>
                    {/* Main product row */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-3">
                        <Checkbox
                          checked={selectedIds.includes(product._id)}
                          onCheckedChange={() => handleSelect(product._id)}
                        />
                      </td>
                      <td className="p-3 font-medium text-gray-900 truncate">
                        {product.name}
                      </td>
                      <td className="p-3 text-gray-500 truncate">
                        {typeof product.category === "object"
                          ? product.category.name
                          : "-"}
                      </td>
                      <td className="p-3 text-gray-500 truncate">
                        { "-"}
                      </td>
                      <td className="p-3 text-gray-500 truncate">
                        { "-"}
                      </td>
                      <td className="p-3 text-gray-500 truncate">
                        { "-"}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            product.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="p-3 text-right flex gap-2 justify-end">
                        <Link
                          to={`/products/${product._id}/edit`}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <ConfirmDialog
                          title="Delete Product"
                          description={`This will permanently delete product "${product.name}".`}
                          confirmText="Delete"
                          onConfirm={() => handleDelete(product._id)}
                          danger
                        >
                          <button className="p-1 text-red-600 hover:bg-red-50 rounded-md">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </ConfirmDialog>
                      </td>
                    </tr>

                    {/* Variant rows */}
                    {product.variants?.map((v) => (
                      <tr
                        key={v._id}
                        className="bg-gray-50 text-sm text-gray-600"
                      >
                        <td></td> {/* Checkbox column empty */}
                        <td className="p-3 pl-8 truncate">SKU: {v.sku}</td>
                        <td className="p-3">{"-"}</td>
                        <td className="p-3">{v.brand?.[0]?.name || "-"}</td>
                        <td className="p-3">{v.type?.[0]?.name || "-"}</td>
                        <td className="p-3">{v.fabric?.[0]?.name || "-"}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              v.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {v.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          ${v.price} / Stock: {v.stock_quantity}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
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
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
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
