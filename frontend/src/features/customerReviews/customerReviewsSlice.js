import { createSlice } from "@reduxjs/toolkit";
import { fetchcustomerReviews } from "./customerReviewsThunk";

const initialState = {
  customerReviews: [],
  loading: false,
  error: null,
};

const customerReviewsSlice = createSlice({
  name: "customerReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    .addCase(fetchcustomerReviews.pending, (state) => {
        state.loading = true;
        })
        .addCase(fetchcustomerReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.customerReviews = action.payload;
        })
        .addCase(fetchcustomerReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        })
  },
});

export default customerReviewsSlice.reducer;
