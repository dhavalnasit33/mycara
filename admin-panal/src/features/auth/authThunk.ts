import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post(ROUTES.auth.login, data);
      console.log('API Response:', res.data);

      // Check for success in API response body
      if (res.data.success) {
        return res.data.data;  
      } else {
        // Reject if success is false
        return rejectWithValue(res.data.message || 'Invalid credentials');
      }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Server Error');
    }
  }
);