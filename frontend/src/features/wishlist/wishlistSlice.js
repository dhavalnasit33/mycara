import { createSlice } from "@reduxjs/toolkit";
import { addToWishlist, bulkDeleteWishlistItems, fetchWishlistByUser, removeWishlistItem } from "./wishlistThunk";

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
      state.wishlistId = action.payload._id || null; 
    })

    
    .addCase(removeWishlistItem.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.items; 
    })

    .addCase(bulkDeleteWishlistItems.fulfilled, (state, action) => {
      state.loading = false;
      const deletedIds = action.meta.arg;
      state.items = state.items.filter(item => !deletedIds.includes(item._id));
    })

  },
});

export default wishlistSlice.reducer;
