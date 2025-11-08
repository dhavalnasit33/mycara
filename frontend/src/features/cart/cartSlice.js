  // // features/cart/cartSlice.js
  import { createSlice } from "@reduxjs/toolkit";
  import { fetchCart, addToCart } from "./cartThunk";

  const initialState = {
    cart:null,
     carts: [],
      loading: false,
      error: null,
      selectedItem: null,
  };

  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Add to cart
        .addCase(addToCart.pending, (state) => {
          state.loading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
          state.loading = false;
          state.carts = action.payload;
        })
        .addCase(addToCart.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // Fetch cart
       .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
  });

  export default cartSlice.reducer;
