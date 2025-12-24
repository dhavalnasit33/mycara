// // D:\mycara\frontend\src\features\products\productsSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts , fetchNewArrivals } from "./productsThunk";

const initialState = {
  products: [],
  product: null,

   newArrivals: [],
  newArrivalsLoading: false,
  newArrivalsError: null,

  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      
      // ⭐ NEW ARRIVALS (IMPORTANT) ⭐
    // builder
    //   .addCase(fetchNewArrivals.pending, (state) => {
    //     state.newArrivalsLoading = true;
    //     state.newArrivalsError = null;
    //   })
    //   .addCase(fetchNewArrivals.fulfilled, (state, action) => {
    //     state.newArrivalsLoading = false;
    //     state.newArrivals = action.payload;
    //   })
    //   .addCase(fetchNewArrivals.rejected, (state, action) => {
    //     state.newArrivalsLoading = false;
    //     state.newArrivalsError = action.payload;
    //   });
      // .addCase(fetchNewArrivals.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.newArrivals = action.payload;
      // })
  },
});

export default productsSlice.reducer;

