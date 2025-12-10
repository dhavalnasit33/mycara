import { createAsyncThunk } from "@reduxjs/toolkit";
import { ROUTES } from "../../services/routes";
import api from "../../services/api";

export const fetchColors = createAsyncThunk(
  "colors/fetchColors",
  async (params = {}, { rejectWithValue }) => {
    try {
         const queryParams = { page: 1, limit: 0, status: "active", ...params };
      const res = await api.get(ROUTES.colors.getAll, { params:queryParams });

      if (res.data.success) {
        return res.data.data; 
      }

      return rejectWithValue(res.data.message || "Failed to fetch colors");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

export const fetchColorById = createAsyncThunk(
    "colors/fetchColorById",
    async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await api.get(ROUTES.colors.getById(id) , {
        headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch color");
    }
    }
);
