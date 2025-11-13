import { createSlice } from "@reduxjs/toolkit";
import { addToWishlist, fetchWishlistByUser, removeWishlistItem } from "./wishlistThunk";

const initialState = { 
  items: [],
  wishlistId: null,
  loading: false,
  error: null
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {   setWishlist: (state, action) => {
      state.items = action.payload;
    },},
  extraReducers: (builder) => {
    builder

      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.loading = false;
      })

        .addCase(fetchWishlistByUser.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload.items || [];
          state.wishlistId = action.payload._id || null; // ✅ store wishlist id
        })

        .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items; // updated wishlist from backend
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  },
});

export default wishlistSlice.reducer;
