"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Trash2, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import {
  fetchWishlistItems,
  deleteWishlistItem,
  bulkDeleteWishlistItems,
} from "@/features/wishlists/wishlistThunk";
import { ConfirmDialog } from "@/components/ui/confirmDialog";

export default function Wishlist() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: wishlists, total, loading } = useSelector((state: RootState) => state.wishlists);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const limit = 5;

  useEffect(() => {
    dispatch(fetchWishlistItems({ page, limit, search: searchQuery }));
  }, [dispatch, page, searchQuery]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteWishlistItem(id)).unwrap();
      toast.success("Wishlist item deleted.");
    } catch {
      toast.error("Failed to delete item.");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    try {
      await dispatch(bulkDeleteWishlistItems(selectedIds)).unwrap();
      toast.success("Selected items deleted.");
      setSelectedIds([]);
    } catch {
      toast.error("Bulk delete failed.");
    }
  };

  const handleDownload = async () => {
    const res = await dispatch(fetchWishlistItems({ isDownload: true })).unwrap();

    const data: any[] = [];
    res.wishlists.forEach((wishlist: any) => {
      wishlist.items.forEach((item: any) => {
        data.push({
          "User Name": wishlist.user_id?.name || "N/A",
          "User Email": wishlist.user_id?.email || "N/A",
          "Product": item.product_id?.name || "N/A",
          "Quantity": item.quantity || 1,
          "Unit Price": item.variant_id?.price || 0,
          "Total": (item.quantity || 1) * (item.variant_id?.price || 0),
          "Added At": new Date(wishlist.createdAt).toLocaleString(),
        });
      });
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "WishlistItems");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), `wishlist_items_${Date.now()}.xlsx`);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  const totalPages = Math.ceil(total / limit);

  // Grand total
  const grandTotal = wishlists.reduce((sum, wishlist) => {
    return (
      sum +
      wishlist.items.reduce((itemSum, item) => {
        return itemSum + (item.quantity || 1) * (item.variant_id?.price || 0);
      }, 0)
    );
  }, 0);

  return (
    <div className="space-y-8 p-6 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Wishlist</h1>
          <p className="text-sm text-gray-500">Manage Wishlist Items</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload} className="flex items-center gap-2">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Search & Bulk Actions */}
      <Card className="shadow-sm border border-gray-200">
        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {selectedIds.length > 0 && (
            <ConfirmDialog
              title="Delete Selected"
              description={`Delete ${selectedIds.length} items permanently.`}
              confirmText="Delete"
              onConfirm={handleBulkDelete}
              danger
            >
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" /> Delete Selected
              </Button>
            </ConfirmDialog>
          )}
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Wishlist Items <span className="text-gray-400 font-normal">({total})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm table-fixed">
              <thead className="bg-gray-50 text-gray-700 text-sm font-medium">
                <tr>
                  <th className="p-3 w-10 text-left">
                    <Checkbox
                      checked={selectedIds.length === wishlists.reduce((a, w) => a + w.items.length, 0)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const allIds: string[] = [];
                          wishlists.forEach((w) => w.items.forEach((item) => allIds.push(item._id)));
                          setSelectedIds(allIds);
                        } else {
                          setSelectedIds([]);
                        }
                      }}
                    />
                  </th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishlists.map((w) =>
                  w.items.length > 0 ? (
                    w.items.map((item) => (
                      <tr key={item._id} className="border-t hover:bg-gray-50">
                        <td className="p-3">
                          <Checkbox
                            checked={selectedIds.includes(item._id)}
                            onCheckedChange={() =>
                              setSelectedIds((prev) =>
                                prev.includes(item._id)
                                  ? prev.filter((id) => id !== item._id)
                                  : [...prev, item._id]
                              )
                            }
                          />
                        </td>
                        <td className="p-3">{w.user_id?.name || "N/A"}</td>
                        <td className="p-3">{w.user_id?.email || "N/A"}</td>
                        <td className="p-3">{item.product_id?.name || "N/A"}</td>
                        <td className="p-3">{item.quantity || 1}</td>
                        <td className="p-3">${item.variant_id?.price?.toFixed(2) || "0.00"}</td>
                        <td className="p-3">${((item.quantity || 1) * (item.variant_id?.price || 0)).toFixed(2)}</td>
                        <td className="p-3 text-right">
                          <ConfirmDialog
                            title="Delete Item"
                            description="Are you sure?"
                            confirmText="Delete"
                            onConfirm={() => handleDelete(item._id)}
                            danger
                          >
                            <button className="text-red-600 hover:bg-red-50 p-1 rounded">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </ConfirmDialog>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr key={w._id} className="border-t hover:bg-gray-50">
                      <td className="p-3 text-center" colSpan={8}>
                        No items in this wishlist.
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* Grand total */}
          <div className="text-right mt-4 font-semibold text-lg">
            Grand Total: ${grandTotal.toFixed(2)}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end gap-2 mt-4">
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
                  className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100"}`}
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
