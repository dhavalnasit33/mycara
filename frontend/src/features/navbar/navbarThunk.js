import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Fetch navbar items
export const fetchNavbar = createAsyncThunk(
  "navbar/fetchNavbar",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.navbar.getAll, { params });

      if (res.data.success) {
        return res.data.data; // this should contain navbars and total
      }

      return rejectWithValue(res.data.message || "Failed to fetch navbar items");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
