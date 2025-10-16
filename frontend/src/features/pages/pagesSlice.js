
import { createSlice } from "@reduxjs/toolkit";
import { fetchPages } from "./pagesThunk";

const initialState = {
  data: [],     
  pages: [],
  loading: false,
  error: null,
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    clearPages: (state) => {
      state.data = [];
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
        state.data = action.payload;
         state.pages = action.payload;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch pages";
      });
  },
});

// ✅ Export actions
export const { clearPages } = pagesSlice.actions;

// ✅ Export selector for useSelector()
export const selectPages = (state) => state.pages;

// ✅ Export reducer
export default pagesSlice.reducer;
