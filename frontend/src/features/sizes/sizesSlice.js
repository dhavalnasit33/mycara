import { createSlice } from "@reduxjs/toolkit";
import { fetchSizes, getSizeById } from "./sizesThunk";

const initialState = {
  sizes: [],
  size: null,
  loading: false,
  error: null,
};

const sizesSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch all sizes
      .addCase(fetchSizes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSizes.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload.sizes;
      })
      .addCase(fetchSizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // ✅ Fetch single size
      .addCase(getSizeById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSizeById.fulfilled, (state, action) => {
        state.loading = false;
        state.size = action.payload.sizes;
      })
      .addCase(getSizeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default sizesSlice.reducer;

