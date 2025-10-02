import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "@/store";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ConfirmDialog } from "@/components/ui/confirmDialog";
import { toast } from "sonner";
import {
  Edit2,
  Trash2,
  Download,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  fetchOrders,
  deleteOrder,
  bulkDeleteOrders,
} from "@/features/orders/ordersThunk";

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, total, loading } = useSelector(
    (state: RootState) => state.orders
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    dispatch(fetchOrders({ page, limit, search: debouncedQuery }));
  }, [debouncedQuery, page, dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteOrder(id)).unwrap();
      toast.success("Order deleted successfully.");
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete order.");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    try {
      await dispatch(bulkDeleteOrders(selectedIds)).unwrap();
      toast.success(`${selectedIds.length} orders deleted successfully.`);
      setSelectedIds([]);
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete orders.");
    }
  };

  const handleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const toggleExpand = (id: string) =>
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const handleDownload = async () => {
    try {
      const result = await dispatch(
        fetchOrders({
          page: 1,
          limit: 1000,
          search: debouncedQuery,
          isDownload: true,
        })
      ).unwrap();

      const data = result.orders.map((o: any) => ({
        "Order ID": o._id,
        User: o.user_id?.name,
        "Total Price": o.total_price,
        Status: o.status,
        Items: o.items
          .map((i: any) => `${i.product_id.name} (${i.quantity})`)
          .join(", "),
        "Created At": new Date(o.createdAt).toLocaleDateString(),
        "Updated At": new Date(o.updatedAt).toLocaleDateString(),
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(blob, `orders_${Date.now()}.xlsx`);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const getStatusBadge = (status: string) => (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        status === "completed"
          ? "bg-green-100 text-green-800"
          : status === "pending"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  if (loading) return <div>Loading orders...</div>;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-8 p-6 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Orders
          </h1>
          <p className="text-sm text-gray-500">Manage your orders</p>
        </div>
        <div className="flex gap-2">
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
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {selectedIds.length > 0 && (
            <ConfirmDialog
              title="Delete Selected Orders"
              description={`This will delete ${selectedIds.length} selected orders.`}
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

      {/* Orders Table */}
      <Card className="shadow-sm border border-gray-200 rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Orders <span className="text-gray-400 font-normal">({total})</span>
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
                        selectedIds.length === orders.length &&
                        orders.length > 0
                      }
                      onCheckedChange={(checked) =>
                        setSelectedIds(checked ? orders.map((o) => o._id) : [])
                      }
                    />
                  </th>
                  <th className="p-3 w-48 text-left">Order ID</th>
                  <th className="p-3 w-32 text-left">User</th>
                  <th className="p-3 w-24 text-left">Total</th>
                  <th className="p-3 w-24 text-left">Status</th>
                  <th className="p-3 w-32 text-left">Created At</th>
                  <th className="p-3 w-24 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-sm">
                {orders.map((order) => {
                  const isExpanded = expandedRows.includes(order._id);
                  return (
                    <React.Fragment key={order._id}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-3">
                          <Checkbox
                            checked={selectedIds.includes(order._id)}
                            onCheckedChange={() => handleSelect(order._id)}
                          />
                        </td>
                        <td className="p-3 font-medium text-gray-900 truncate">
                          {order._id}
                        </td>
                        <td className="p-3">{order.user_id?.name}</td>
                        <td className="p-3">${order.total_price.toFixed(2)}</td>
                        <td className="p-3">{getStatusBadge(order.status)}</td>
                        <td className="p-3">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 flex items-center justify-end gap-2">
                          {/* Expand/Collapse */}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="p-1 h-8 w-8 flex items-center justify-center"
                            onClick={() => toggleExpand(order._id)}
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>

                         
                          {/* Delete */}
                          <ConfirmDialog
                            title="Delete Order"
                            description={`This will permanently delete order "${order._id}".`}
                            confirmText="Delete"
                            onConfirm={() => handleDelete(order._id)}
                            danger
                          >
                            <button className="p-1 h-8 w-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-md transition">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </ConfirmDialog>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-gray-50">
                          <td colSpan={7} className="p-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {order.items.map((item) => (
                                <div
                                  key={item._id}
                                  className="p-3 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
                                >
                                  <p className="font-semibold text-gray-800 truncate">
                                    {item.product_id?.name}
                                  </p>
                                  <p className="text-gray-600 text-sm">
                                    Qty: {item.quantity}
                                  </p>
                                  <p className="text-gray-600 text-sm">
                                    Price: ${item.price_at_order.toFixed(2)}
                                  </p>
                                  {item.variant_id && (
                                    <p className="text-gray-600 text-sm truncate">
                                      Variant:{" "}
                                      {`${
                                        item.variant_id.color_id?.name || "-"
                                      } / ${
                                        item.variant_id.size_id?.name || "-"
                                      }`}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
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
