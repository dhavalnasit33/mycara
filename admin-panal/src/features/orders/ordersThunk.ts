import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// ✅ Fetch orders (with pagination, search & all filters)
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      isDownload?: boolean;
      status?: "pending" | "processing" | "completed" | "cancelled" | "all";
      startDate?: string;
      endDate?: string;
      minPrice?: number;
      maxPrice?: number;
      user?: string; // single or comma-separated IDs
      product?: string; // single or comma-separated product IDs
      color?: string; // color ID(s)
      size?: string; // size ID(s)
    } = {},
    { rejectWithValue }
  ) => {
    try {
      // Remove empty/undefined/null params
      const filteredParams = Object.fromEntries(
        Object.entries(params).filter(
          ([, v]) => v !== undefined && v !== "" && v !== null
        )
      );

      // Convert "all" status to undefined for backend
      if (filteredParams.status === "all") {
        delete filteredParams.status;
      }

      const res = await api.get(ROUTES.orders.getAll, { params: filteredParams });

      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to fetch orders");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// ✅ Get order by ID (with items)
export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.orders.getById(id));
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Order not found");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// ✅ Update order
export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await api.put(ROUTES.orders.update(id), data);
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to update order");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// ✅ Update order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }: { id: string; status: "active" | "inactive" }, { rejectWithValue }) => {
    try {
      const res = await api.put(ROUTES.orders.updateStatus(id), { status });
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to update status");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// ✅ Delete order
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(ROUTES.orders.delete(id));
      if (res.data.success) return id;
      return rejectWithValue(res.data.message || "Failed to delete order");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// ✅ Bulk delete orders
export const bulkDeleteOrders = createAsyncThunk(
  "orders/bulkDeleteOrders",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.orders.bulkDelete, { ids });
      if (res.data.success) return ids;
      return rejectWithValue(res.data.message || "Failed to delete orders");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
