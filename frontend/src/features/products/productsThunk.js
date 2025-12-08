//D:\mycara\frontend\src\features\products\productsThunk.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page , limit } = {}, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.products.getAll, {
        params: { page, limit }
      });

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


// ⭐ fetch NEW ARRIVALS ⭐
export const fetchNewArrivals = createAsyncThunk(
  "products/fetchNewArrivals",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/products", {
        params: {
          variantLabel: "New Arrivals", 
          limit: 100,
        },
      });

      return res.data.data.products; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);


