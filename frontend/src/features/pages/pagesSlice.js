
// D:\mycara\frontend\src\features\pages\pagesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchPages } from "./pagesThunk";

const initialState = {
  pages: [],
  loading: false,
  error: null,
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    clearPages: (state) => {
      state.pages = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload.pages;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch pages";
      });
  },
});

// ✅ Export actions
export const { clearPages } = pagesSlice.actions;



// ✅ Export reducer
export default pagesSlice.reducer;
