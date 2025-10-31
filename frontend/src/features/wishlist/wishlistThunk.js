import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// ✅ Get all wishlist items
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.wishlist.getAll);
      return res.data.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch wishlist");
    }
  }
);

