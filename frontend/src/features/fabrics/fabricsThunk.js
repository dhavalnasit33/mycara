import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Fetch navbar items
export const fetchFabrics = createAsyncThunk(
  "fabrics/fetchFabrics",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = { page: 1, limit: 0, status: "active" , ...params };
      const res = await api.get(ROUTES.fabrics.getAll, { params: queryParams });

      if (res.data.success) {
        return res.data.data; 
      }

      return rejectWithValue(res.data.message || "Failed to fetch fabrics");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
