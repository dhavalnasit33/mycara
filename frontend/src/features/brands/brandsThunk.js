import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Fetch navbar items
export const fetchBrands = createAsyncThunk(
  "brands/fetchbrands",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.brands.getAll, { params });

      if (res.data.success) {
        return res.data.data.brands; 
      }

      return rejectWithValue(res.data.message || "Failed to fetch product");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
