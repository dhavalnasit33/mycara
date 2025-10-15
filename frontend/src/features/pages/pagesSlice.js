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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pagesSlice.reducer;
