import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// 🔹 Get coupons for frontend (users)
export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async (params, { rejectWithValue }) => {
    try {
      const result = await api.get(
        ROUTES.coupons.getAll,
        { params }
      );

      return result.data.data; // { coupons, total, page }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// 🔹 Get single coupon (optional)
export const fetchCouponById = createAsyncThunk(
  "coupons/fetchCouponById",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = api.get(ROUTES.coupons.getById(id),{
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
