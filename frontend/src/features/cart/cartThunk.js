// features/cart/cartThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(ROUTES.cart.addItem, payload, {  headers: { Authorization: `Bearer ${token}` }, });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Add to cart failed.");
    }
  }
);

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      const user_id = user?._id;

      const response = await api.post(
        ROUTES.cart.getAll,
        { user_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const cart = response.data?.data;

      if (cart?._id) {
        localStorage.setItem("cart_id", cart._id);
      }

      return cart;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Create cart failed");
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      let cart_id = localStorage.getItem("cart_id");

      if (!cart_id) {
        const newCart = await dispatch(createCart()).unwrap();
        cart_id = newCart?._id;
      }

      const response = await api.get(
        ROUTES.cart.getById(cart_id),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const cart = response.data?.data;

      if (cart?._id) {
        localStorage.setItem("cart_id", cart._id);
      }

      return cart;
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
