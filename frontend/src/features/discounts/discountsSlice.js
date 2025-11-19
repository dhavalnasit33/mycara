import { createSlice } from "@reduxjs/toolkit";
import { fetchDiscounts } from "./discountsThunk";

const initialState = {
  discounts: [],
  loading: false,
  error: null,
};

const discountsSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscounts.fulfilled, (state, action) => {
        state.loading = false;
        state.discounts = action.payload.discounts;
      })
      .addCase(fetchDiscounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default discountsSlice.reducer;
