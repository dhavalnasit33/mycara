// D:\mycara\frontend\src\features\wishlist\wishlistThunk.js


import { createAsyncThunk } from "@reduxjs/toolkit";
import { ROUTES } from "../../services/routes";
import api from "../../services/api";

<<<<<<< HEAD
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
=======
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ user_id, product_id, variant_id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        ROUTES.wishlist.addItem,
        { user_id, items: [{ product_id, variant_id }] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchWishlistByUser = createAsyncThunk(
  "wishlists/fetchWishlistByUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(ROUTES.wishlist.getByUser(id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data;

      // ✅ Return entire wishlist object, not just items
      if (data.data) {
        return data.data;
      } else {
        return { items: [] };
      }
>>>>>>> 437ec24e58425f561a3f4f4bed52f9e20984014d
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

<<<<<<< HEAD
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
=======
export const removeWishlistItem = createAsyncThunk(
  "wishlists/removeItem",
  async ({ wishlist_id, item_id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(ROUTES.wishlist.removeItem, {
        headers: { Authorization: `Bearer ${token}` },
       data: { wishlist_id, item_id },
      });
      return response.data.data; // backend returns updated wishlist
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Error removing item");
    }
  }
);
>>>>>>> 437ec24e58425f561a3f4f4bed52f9e20984014d
