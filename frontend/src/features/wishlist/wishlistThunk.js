// D:\mycara\frontend\src\features\wishlist\wishlistThunk.js


import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// 🔹 Fetch wishlist items for a user
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (user_id, { rejectWithValue }) => {
    try {
      const res = await api.get(ROUTES.wishlist.getByUser(user_id));
      if (res.data.success) {
        return res.data.data.items || [];
      }
      return rejectWithValue(res.data.message || "Failed to fetch wishlist");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// 🔹 Add item to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ user_id, product_id }, { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.wishlist.addItem, { user_id, product_id });

      if (res.data.success) {
        return { user_id, product_id };
      }
      return rejectWithValue(res.data.message || "Failed to add to wishlist");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
