import { createAsyncThunk } from "@reduxjs/toolkit";
import { ROUTES } from "../../services/routes";
import api from "../../services/api";

export const fetchcustomerReviews = createAsyncThunk(
  "customerReviews/fetchcustomerReviews",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.customerReviews.getAll, { params });

      if (res.data.success) {
        return res.data.data; 
      }

      return rejectWithValue(res.data.message || "Failed to fetch reviews.");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

