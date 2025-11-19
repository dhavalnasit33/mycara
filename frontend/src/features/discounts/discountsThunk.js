import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Fetch navbar items
export const fetchDiscounts = createAsyncThunk(
  "discounts/fetchDiscounts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.discounts.getAll, { params });

      if (res.data.success) {
        return res.data.data; 
      }

      return rejectWithValue(res.data.message || "Failed to fetch discounts");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
