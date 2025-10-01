import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// ✅ Fetch orders (with pagination/search)
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (
    params: { page?: number; limit?: number; search?: string; isDownload?: boolean } = {},
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get(ROUTES.orders.getAll, { params });
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
