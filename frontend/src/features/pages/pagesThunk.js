// D:\mycara\frontend\src\features\pages\pagesThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";


export const fetchPages = createAsyncThunk(
  "pages/fetchPages",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.pages.getAll, { params });

      if (res.data.success) {
        return res.data.data.pages; 
      }

      return rejectWithValue(res.data.message || "Failed to fetch product");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
