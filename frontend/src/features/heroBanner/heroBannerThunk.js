import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Fetch active banner from backend
export const fetchHeroBanner = createAsyncThunk(
  "heroBanner/fetchHeroBanner",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.heroBanners.getOne);
      if (res.data.success && res.data.data.heroBanner) {
        return res.data.data.heroBanner;
      }
      return rejectWithValue("No active banner found");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
