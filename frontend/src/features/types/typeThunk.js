import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Fetch navbar items
export const fetchtypes = createAsyncThunk(
  "types/fetchtypes",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.types.getAll, { params });

      if (res.data.success) {
        return res.data.data.types; 
      }

      return rejectWithValue(res.data.message || "Failed to fetch types");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
