// features/customerReviews/customerReviewsThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";
import { ROUTES } from "@/services/routes";

// Fetch all customer reviews
export const fetchCustomerReviews = createAsyncThunk(
  "customerReviews/fetchAll",
  async (
    params: { page?: number; limit?: number; search?: string; isDownload?: boolean;is_approved?: boolean } = {},
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get(ROUTES.customerReviews.getAll, { params });
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to fetch");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

// Get review by ID
export const getCustomerReviewById = createAsyncThunk(
  "customerReviews/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.customerReviews.getById(id));
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Not found");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

// ✅ Update review status
export const updateReviewsStatus = createAsyncThunk(
  "customerReviews/updateReviewsStatus",
  async ({ id, is_approved }: { id: string; is_approved?: boolean }, { rejectWithValue }) => {
    try {
      const res = await api.put(ROUTES.customerReviews.updateStatus(id), { is_approved });
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to update status");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// Delete single
export const deleteCustomerReview = createAsyncThunk(
  "customerReviews/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(ROUTES.customerReviews.delete(id));
      if (res.data.success) return id;
      return rejectWithValue(res.data.message || "Failed to delete");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

// Bulk delete
export const bulkDeleteCustomerReviews = createAsyncThunk(
  "customerReviews/bulkDelete",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.customerReviews.bulkDelete, { ids });
      if (res.data.success) return ids;
      return rejectWithValue(res.data.message || "Failed to delete");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);
