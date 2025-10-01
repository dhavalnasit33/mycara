import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Fetch users (with pagination/search)
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    params: { page?: number; limit?: number; search?: string; isDownload?: boolean; status?: "active" | "inactive" } = {},
    { rejectWithValue }
  ) => {
    try {
      const { isDownload = false, ...query } = params;
      const res = await api.get(ROUTES.users.getAll, { params: { ...query, isDownload } });
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to fetch users");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Get user by ID
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.users.getById(id));
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "User not found");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Create user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.users.create, data);
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to create user");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await api.put(ROUTES.users.update(id), data);
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to update user");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(ROUTES.users.delete(id));
      if (res.data.success) return id;
      return rejectWithValue(res.data.message || "Failed to delete user");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Bulk delete users
export const bulkDeleteUsers = createAsyncThunk(
  "users/bulkDeleteUsers",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.users.bulkDelete, { ids });
      if (res.data.success) return ids;
      return rejectWithValue(res.data.message || "Failed to delete users");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
