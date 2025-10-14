import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Fetch navbar items
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.categories.getAll, { params });

      if (res.data.success) {
        return res.data.data.categories; 
      }

      return rejectWithValue(res.data.message || "Failed to fetch navbar items");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
