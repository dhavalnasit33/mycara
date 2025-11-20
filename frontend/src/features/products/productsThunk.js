//D:\mycara\frontend\src\features\products\productsThunk.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit }, { rejectWithValue }) => {
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

//NewArrivals
export const fetchProductsByVariant = createAsyncThunk(
  "products/fetchProductsByVariant",
  async ({ variantLabel, limit }, { rejectWithValue }) => {
    try {
      
      const params = {
        variant_label: variantLabel, 
        limit: limit,
      };

      // getAll એન્ડપોઇન્ટનો ઉપયોગ કરો અને query parameters મોકલો
      const res = await api.get(ROUTES.products.getAll, { params });

      if (res.data.success) {
        // Fetched products નો એરે રિટર્ન કરો
        return res.data.data.products;
      }

      return rejectWithValue(res.data.message || `Failed to fetch products for variant: ${variantLabel}`);
    } catch (err) {
      // console.error(err); // debugging માટે
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);