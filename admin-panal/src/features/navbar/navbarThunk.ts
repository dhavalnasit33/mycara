import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";
import { ROUTES } from "@/services/routes";

// Fetch navbar items
export const fetchNavbar = createAsyncThunk(
  "navbar/fetchNavbar",
  async (params: { page?: number; limit?: number; search?: string } = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.navbar.getAll, { params });
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to fetch navbar items");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Get navbar item by ID
export const getNavbarItemById = createAsyncThunk(
  "navbar/getNavbarItemById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.navbar.getById(id));
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Navbar item not found");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Create navbar item
export const createNavbarItem = createAsyncThunk(
  "navbar/createNavbarItem",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.navbar.create, data);
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to create navbar item");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Update navbar item
export const updateNavbarItem = createAsyncThunk(
  "navbar/updateNavbarItem",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await api.put(ROUTES.navbar.update(id), data);
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to update navbar item");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Delete navbar item
export const deleteNavbarItem = createAsyncThunk(
  "navbar/deleteNavbarItem",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(ROUTES.navbar.delete(id));
      if (res.data.success) return id;
      return rejectWithValue(res.data.message || "Failed to delete navbar item");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Bulk delete navbar items
export const bulkDeleteNavbarItems = createAsyncThunk(
  "navbar/bulkDeleteNavbarItems",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.navbar.bulkDelete, { ids });
      if (res.data.success) return ids;
      return rejectWithValue(res.data.message || "Failed to delete navbar items");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
