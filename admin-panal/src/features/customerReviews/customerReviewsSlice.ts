// features/customerReviews/customerReviewsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCustomerReviews,
  deleteCustomerReview,
  bulkDeleteCustomerReviews,
  getCustomerReviewById,
} from "./customerReviewsThunk";

interface CustomerReviewState {
  customerReviews: any[];
  total: number;
  loading: boolean;
  error: string | null;
  selectedReview: any | null;
}

const initialState: CustomerReviewState = {
  customerReviews: [],
  total: 0,
  loading: false,
  error: null,
  selectedReview: null,
};

const customerReviewsSlice = createSlice({
  name: "customerReviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.customerReviews = action.payload.customerReviews;
        state.total = action.payload.total;
      })
      .addCase(fetchCustomerReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCustomerReview.fulfilled, (state, action) => {
        state.customerReviews = state.customerReviews.filter(
          (r) => r._id !== action.payload
        );
      })
      .addCase(bulkDeleteCustomerReviews.fulfilled, (state, action) => {
        state.customerReviews = state.customerReviews.filter(
          (r) => !action.payload.includes(r._id)
        );
      })
      .addCase(getCustomerReviewById.fulfilled, (state, action) => {
        state.selectedReview = action.payload;
      });
  },
});

export default customerReviewsSlice.reducer;
