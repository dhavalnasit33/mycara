import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Fetch users based on role
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    params: { page?: number; limit?: number; search?: string; isDownload?: boolean; role?: string } = {},
    { rejectWithValue }
  ) => {
    try {
      const { role, ...query } = params;
      const url =
        role === "store_owner"
          ? ROUTES.users.getStoreCustomers
          : ROUTES.users.getAll;

      const res = await api.get(url, { params: query });
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to fetch users");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Other CRUD thunks
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
