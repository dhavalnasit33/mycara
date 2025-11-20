// features/cart/cartThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

export const addToCart = createAsyncThunk(
  "carts/addToCart",
  async ({ cart_id, product_id, variant_id, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        ROUTES.cart.addItem,
        { cart_id, product_id, variant_id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const createCart = createAsyncThunk(
  "cart/createCart",
  async ({ user_id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
       ROUTES.cart.getAll,
        { user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const cart = response.data.data;

      localStorage.setItem("cart_id", cart._id);

      return cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Create cart failed");
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (cart_id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(ROUTES.cart.getById(cart_id), {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch cart failed");
    }
  }
);



export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ cart_id, item_id, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.put(ROUTES.cart.updateItem, { cart_id, item_id, quantity },
        {
          headers: { "Content-Type": "application/json",  Authorization: `Bearer ${token}`, },
        }
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update Item");
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ cart_id, item_id }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.delete(ROUTES.cart.deleteCart, {
        data: { cart_id, item_id }, // ✅ body for DELETE
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ token included correctly
        },
      });

      return res.data.data ?? res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
