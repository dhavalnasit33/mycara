//D:\mycara\frontend\src\features\products\productsThunk.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Fetch navbar items
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.products.getAll, { params });

      if (res.data.success) {
        return res.data.data.products; 
      }

      return rejectWithValue(res.data.message || "Failed to fetch product");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(ROUTES.products.getById(id), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
  
      if (res.data.success) {
        return res.data.data; 
      }
      return rejectWithValue(res.data.message || "Failed to fetch product");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);


export const fetchNewArrivals = createAsyncThunk(
  "products/fetchNewArrivals",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.products.getAll, {
        // 🔍 Only fetch products that have Variant Label = "New Arrivals"
        params: { 
          variantLabel: "New Arrivals",
          sort: "-createdAt",
          limit: 100,
        },
      });

      if (res.data?.success) {
        return res.data.data?.products || [];
      }

      return rejectWithValue(res.data?.message || "Failed to fetch new arrivals");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
