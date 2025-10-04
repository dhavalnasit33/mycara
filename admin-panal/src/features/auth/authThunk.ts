import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// LOGIN THUNK
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.auth.login, data);
      if (res.data.success) {
        return res.data.data;
      } else {
        return rejectWithValue(res.data.message || "Invalid credentials");
      }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);

// REGISTER STORE OWNER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    data: {
      name: string;
      email: string;
      password: string;
      storeName: string;
      storeEmail: string;
      storePhone?: string;
      storeWebsite?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(ROUTES.auth.register, data);
      if (res.data.success) {
        return res.data.data;
      } else {
        return rejectWithValue(res.data.message || "Registration failed");
      }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Server Error");
    }
  }
);
