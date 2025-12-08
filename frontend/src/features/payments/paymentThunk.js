import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// Create payment
export const createPayment = createAsyncThunk(
  "payments/createPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // auth token
      const res = await api.post(ROUTES.payments.getAll, paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);