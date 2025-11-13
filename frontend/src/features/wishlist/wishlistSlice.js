<<<<<<< HEAD
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
=======
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
>>>>>>> 437ec24e58425f561a3f4f4bed52f9e20984014d
  extraReducers: (builder) => {
    builder

      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
<<<<<<< HEAD
        state.items = action.payload;
=======
        state.items = action.payload.data;
>>>>>>> 437ec24e58425f561a3f4f4bed52f9e20984014d
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
<<<<<<< HEAD
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push({ product_id: action.payload.product_id });
      });
=======
      });

>>>>>>> 437ec24e58425f561a3f4f4bed52f9e20984014d
  },
});

export default wishlistSlice.reducer;
