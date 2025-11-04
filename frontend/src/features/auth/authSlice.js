// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authThunk";

function safeParse(item) {
  try {
    const data = localStorage.getItem(item);
    return data && data !== "undefined" ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

const initialState = {
  user: safeParse("user"),
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { token, user } = action.payload.data || {};
        if (token && user) {
          state.token = token;
          state.user = user;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // ✅ REGISTER

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        const { token, user } = action.payload.data || {};
        if (token && user) {
          state.token = token;
          state.user = user;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
