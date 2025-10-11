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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchProducts } from "@/features/products/productsThunk";
import { fetchUsers } from "@/features/users/usersThunk";
import { fetchColors } from "@/features/colors/colorsThunk";
import { fetchSizes } from "@/features/sizes/sizesThunk";
import { FilterValues } from "@/features/orders/ordersSlice";

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, total, loading } = useSelector(
    (state: RootState) => state.orders
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [colorFilter, setColorFilter] = useState<string[]>([]);
  const [productFilter, setProductFilter] = useState<string[]>([]);
  const [userFilter, setUserFilter] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<{
    min?: number;
    max?: number;
  }>({});
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "processing" | "completed" | "cancelled"
  >("all");

  const { products } = useSelector((state: RootState) => state.products);
  const { users } = useSelector((state: RootState) => state.users);
  const { colors } = useSelector((state: RootState) => state.colors);
  const { sizes } = useSelector((state: RootState) => state.sizes);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 1000 }));
    dispatch(fetchUsers({ page: 1, limit: 1000 }));
    dispatch(fetchColors({ page: 1, limit: 100 }));
    dispatch(fetchSizes({ page: 1, limit: 100 }));
  }, [dispatch]);

  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "all",
    user: "",
    product: "",
    color: "",
    size: "",
    startDate: "",
    endDate: "",
    minPrice: undefined,
    maxPrice: undefined,
  });

  const limit = 5;

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    dispatch(
      fetchOrders({
        page,
        limit,
        search: debouncedQuery,
        status:
          filters.status === "all"
            ? undefined
            : (filters.status as
                | "pending"
                | "processing"
                | "completed"
                | "cancelled"),
        user: filters.user || undefined,
        product: filters.product || undefined,
        color: filters.color || undefined,
        size: filters.size || undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      })
    );
  }, [debouncedQuery, page, filters, dispatch]);

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

  const MultiSelectPopover = ({
    label,
    options,
    selected,
    setSelected,
  }: {
    label: string;
    options: { value: string; label: string }[];
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full text-left">
          {selected.length
            ? selected
                .map((s) => options.find((o) => o.value === s)?.label)
                .join(", ")
            : label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 max-h-64 overflow-y-auto">
        {options.map((o) => (
          <div key={o.value} className="flex items-center space-x-2 py-1">
            <Checkbox
              checked={selected.includes(o.value)}
              onCheckedChange={(checked) => {
                if (checked) setSelected([...selected, o.value]);
                else setSelected(selected.filter((s) => s !== o.value));
              }}
            />
            <span>{o.label}</span>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );

  const OrderAdvancedFilters = ({
    onApply,
  }: {
    onApply: (filters: FilterValues) => void;
  }) => {
    const [localProduct, setLocalProduct] = useState(productFilter);
    const [localUser, setLocalUser] = useState(userFilter);
    const [localColor, setLocalColor] = useState(colorFilter);
    const [localSize, setLocalSize] = useState(sizeFilter);
    const [localPrice, setLocalPrice] = useState(priceFilter);

    const handleApply = () => {
      onApply({
        product: localProduct,
        user: localUser,
        color: localColor,
        size: localSize,
        price: localPrice,
      });
    };

    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-700">Products</h4>
        <MultiSelectPopover
          label="Select Products"
          options={products.map((p) => ({ value: p._id, label: p.name }))}
          selected={localProduct}
          setSelected={setLocalProduct}
        />

        <h4 className="font-semibold text-gray-700">Users</h4>
        <MultiSelectPopover
          label="Select Users"
          options={users.map((u) => ({ value: u._id, label: u.name }))}
          selected={localUser}
          setSelected={setLocalUser}
        />

        <h4 className="font-semibold text-gray-700">Colors</h4>
        <MultiSelectPopover
          label="Select Colors"
          options={colors.map((c) => ({ value: c._id, label: c.name }))}
          selected={localColor}
          setSelected={setLocalColor}
        />

        <h4 className="font-semibold text-gray-700">Sizes</h4>
        <MultiSelectPopover
          label="Select Sizes"
          options={sizes.map((s) => ({ value: s._id, label: s.name }))}
          selected={localSize}
          setSelected={setLocalSize}
        />

        <h4 className="font-semibold text-gray-700">Price Range</h4>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={localPrice.min || ""}
            onChange={(e) =>
              setLocalPrice({ ...localPrice, min: Number(e.target.value) })
            }
          />
          <Input
            type="number"
            placeholder="Max"
            value={localPrice.max || ""}
            onChange={(e) =>
              setLocalPrice({ ...localPrice, max: Number(e.target.value) })
            }
          />
        </div>

        <Button className="w-full mt-2" onClick={handleApply}>
          Apply Filters
        </Button>
      </div>
    );
  };

  if (loading) return <div>Loading orders...</div>;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Orders
          </h1>
          <p className="text-sm text-gray-500">
            Manage and review all customer orders.
          </p>
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

      {/* Filters */}
      {/* Filters */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status dropdown (can keep this simple) */}
         <Select
  value={filters.status}
  onValueChange={(value) =>
    setFilters((prev) => ({ ...prev, status: value }))
  }
>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Filter by status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All</SelectItem>
    <SelectItem value="pending">Pending</SelectItem>
    <SelectItem value="processing">Processing</SelectItem>
    <SelectItem value="completed">Completed</SelectItem>
    <SelectItem value="cancelled">Cancelled</SelectItem>
  </SelectContent>
</Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                Advanced Filters
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-full md:w-96 p-4 space-y-4">
              <OrderAdvancedFilters
                onApply={({ product, user, color, size, price }) => {
                  setPage(1);
                  // Call API with local filter values directly
                  dispatch(
                    fetchOrders({
                      page: 1,
                      limit,
                      search: debouncedQuery,
                      status: statusFilter === "all" ? undefined : statusFilter,
                      product: product.join(",") || undefined,
                      user: user.join(",") || undefined,
                      color: color.join(",") || undefined,
                      size: size.join(",") || undefined,
                      minPrice: price.min,
                      maxPrice: price.max,
                    })
                  );

                  // Update global state if needed
                  setProductFilter(product);
                  setUserFilter(user);
                  setColorFilter(color);
                  setSizeFilter(size);
                  setPriceFilter(price);
                }}
              />
            </PopoverContent>
          </Popover>

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
      <Card className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <CardHeader className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Orders <span className="text-gray-400 font-normal">({total})</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-700">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-3 text-left w-10">
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
                  <th className="p-3 text-left">Order Number</th>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Created</th>
                  <th className="p-3 text-right w-28">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => {
                  const isExpanded = expandedRows.includes(order._id);
                  return (
                    <React.Fragment key={order._id}>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="p-3 align-middle">
                          <Checkbox
                            checked={selectedIds.includes(order._id)}
                            onCheckedChange={() => handleSelect(order._id)}
                          />
                        </td>
                        <td className="p-3 font-medium text-gray-900 truncate">
                          {order.order_number}
                        </td>
                        <td className="p-3">{order.user?.name || "—"}</td>
                        <td className="p-3 font-semibold">
                          ${order.total_price.toFixed(2)}
                        </td>
                        <td className="p-3">{getStatusBadge(order.status)}</td>
                        <td className="p-3 text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end items-center gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => toggleExpand(order._id)}
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-gray-600" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-gray-600" />
                              )}
                            </Button>

                            <ConfirmDialog
                              title="Delete Order"
                              description={`This will permanently delete order "${order._id}".`}
                              confirmText="Delete"
                              onConfirm={() => handleDelete(order._id)}
                              danger
                            >
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </ConfirmDialog>
                          </div>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-gray-50">
                          <td colSpan={7} className="p-0">
                            <div className="border-t border-gray-200">
                              <div className="bg-white rounded-b-lg p-4">
                                <p className="text-sm font-semibold text-gray-800 mb-3">
                                  Order Items
                                </p>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm text-gray-700">
                                    <thead className="bg-gray-100 text-gray-600 font-medium">
                                      <tr>
                                        <th className="px-3 py-2 text-left w-1/3">
                                          Product
                                        </th>
                                        <th className="px-3 py-2 text-left w-1/6">
                                          Variant
                                        </th>
                                        <th className="px-3 py-2 text-center w-1/6">
                                          Quantity
                                        </th>
                                        <th className="px-3 py-2 text-right w-1/6">
                                          Price
                                        </th>
                                        <th className="px-3 py-2 text-right w-1/6">
                                          Subtotal
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                      {order.items.map((item) => (
                                        <tr
                                          key={item._id}
                                          className="hover:bg-gray-50 transition-colors"
                                        >
                                          <td className="px-3 py-2 font-medium text-gray-900 truncate">
                                            {item.product?.name ||
                                              "Unnamed Product"}
                                          </td>
                                          <td className="px-3 py-2 text-gray-600 truncate">
                                            {item.variant
                                              ? `${item.variant.color[0]?.name || "-"} / ${item.variant.size[0]?.name || "-"}`
                                              : "-"}
                                          </td>
                                          <td className="px-3 py-2 text-center text-gray-700">
                                            {item.quantity}
                                          </td>
                                          <td className="px-3 py-2 text-right text-gray-700">
                                            ${item.price_at_order.toFixed(2)}
                                          </td>
                                          <td className="px-3 py-2 text-right font-semibold text-gray-900">
                                            $
                                            {(
                                              item.price_at_order *
                                              item.quantity
                                            ).toFixed(2)}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
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
            <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-100">
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
