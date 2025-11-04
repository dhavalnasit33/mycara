// features/cart/cartThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(ROUTES.cart.addItem, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Add to cart failed.");
    }
  }
);


export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => { 
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(ROUTES.cart.getAll, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data?.carts;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Fetch cart failed");
    }
  }
);