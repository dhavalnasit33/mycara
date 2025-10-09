import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// ✅ Fetch sections
export const fetchSections = createAsyncThunk(
  "sections/fetchSections",
  async (
    params: { page?: number; limit?: number; search?: string; status?: "active" | "inactive"; isDownload?: boolean } = {},
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get(ROUTES.sections.getAll, { params });
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to fetch sections");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// ✅ Get section by ID
export const getSectionById = createAsyncThunk(
  "sections/getSectionById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.sections.getById(id));
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Section not found");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// ✅ Create section
export const createSection = createAsyncThunk(
  "sections/createSection",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.sections.create, data);
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to create section");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// ✅ Update section
export const updateSection = createAsyncThunk(
  "sections/updateSection",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await api.put(ROUTES.sections.update(id), data);
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to update section");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// ✅ Update section status
export const updateSectionStatus = createAsyncThunk(
  "sections/updateSectionStatus",
  async ({ id, status }: { id: string; status: "active" | "inactive" }, { rejectWithValue }) => {
    try {
      const res = await api.put(ROUTES.sections.updateStatus(id), { status });
      if (res.data.success) return res.data.data;
      return rejectWithValue(res.data.message || "Failed to update status");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// ✅ Delete section
export const deleteSection = createAsyncThunk(
  "sections/deleteSection",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await api.delete(ROUTES.sections.delete(id));
      if (res.data.success) return id;
      return rejectWithValue(res.data.message || "Failed to delete section");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// ✅ Bulk delete sections
export const bulkDeleteSections = createAsyncThunk(
  "sections/bulkDeleteSections",
  async (ids: string[], { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.sections.bulkDelete, { ids });
      if (res.data.success) return ids;
      return rejectWithValue(res.data.message || "Failed to delete sections");
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
