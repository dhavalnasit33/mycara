import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

export const fetchSizes = createAsyncThunk(
  "sizes/fetchsize",
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = { page: 1, limit: 0, status: "active" , ...params };
      const res = await api.get(ROUTES.sizes.getAll, { params: queryParams });

      if (res.data.success) {
        return res.data.data; 
      }

      return rejectWithValue(res.data.message || "Failed to fetch sizes");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

export const getSizeById = createAsyncThunk(
    "sizes/getSizeById",
    async (id, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token");
        const res = await api.get(ROUTES.sizes.getById(id) , {
        headers: { Authorization: `Bearer ${token}` },
        });
        return res.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch size");
    }
    }
);
