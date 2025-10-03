import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";
import { ROUTES } from "@/services/routes";

// Fetch footer items
export const fetchFooter = createAsyncThunk(
  "footer/fetchFooter",
  async (params: { page?: number; limit?: number; search?: string } = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.footer.getAll, { params });
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to fetch footer items");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Get footer item by ID
export const getFooterItemById = createAsyncThunk(
  "footer/getFooterItemById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.footer.getById(id));
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Footer item not found");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Create footer item
export const createFooterItem = createAsyncThunk(
  "footer/createFooterItem",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.footer.create, data);
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to create footer item");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Update footer item
export const updateFooterItem = createAsyncThunk(
  "footer/updateFooterItem",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await api.put(ROUTES.footer.update(id), data);
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to update footer item");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Delete footer item
export const deleteFooterItem = createAsyncThunk(
  "footer/deleteFooterItem",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(ROUTES.footer.delete(id));
      if (res.data.success) return id;
      return rejectWithValue(res.data.message || "Failed to delete footer item");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Bulk delete footer items
export const bulkDeleteFooterItems = createAsyncThunk(
  "footer/bulkDeleteFooterItems",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.footer.bulkDelete, { ids });
      if (res.data.success) return ids;
      return rejectWithValue(res.data.message || "Failed to delete footer items");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
