// D:\mycara\frontend\src\features\heroBanner\heroBannerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchHeroBanner } from "./heroBannerThunk";

const initialState = { data: null, loading: false, error: null };

const heroBannerSlice = createSlice({
  name: "heroBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroBanner.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchHeroBanner.fulfilled, (state, action) => { state.loading = false; state.data = action.payload })
      .addCase(fetchHeroBanner.rejected, (state, action) => { state.loading = false; state.error = action.payload });
  },
});

export const selectHeroBanner = (state) => state.heroBanner;
export default heroBannerSlice.reducer;
