import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Fetch navbar items
export const fetchFooter = createAsyncThunk(
  "footer/fetchFooter",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.footer.getAll, { params });

      if (res.data.success) {
        return res.data.data; 
      }

      return rejectWithValue(res.data.message || "Failed to fetch footer labels");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
