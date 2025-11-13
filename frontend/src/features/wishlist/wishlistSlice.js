//D:\mycara\frontend\src\features\wishlist\wishlistSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchWishlist, addToWishlist } from "./wishlistThunk";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push({ product_id: action.payload.product_id });
      });
  },
});

export default wishlistSlice.reducer;
