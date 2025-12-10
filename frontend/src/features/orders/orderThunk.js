import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(ROUTES.orders.getAll, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(ROUTES.orders.getById(orderId), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async ({ userId, page = 1, limit = 5, search = "" }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(ROUTES.orders.getUserOrders(userId), {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit, search },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);
