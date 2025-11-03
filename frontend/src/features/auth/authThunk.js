import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ROUTES } from "../../services/routes";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(ROUTES.auth.login, { username, password });

      const token = res.data?.data?.token;
      const user = res.data?.data?.user;

      if (!token) throw new Error("Token not found");

      // store token localStorage ma
      localStorage.setItem("token", token);

      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
