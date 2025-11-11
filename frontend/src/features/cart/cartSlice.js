  // // features/cart/cartSlice.js
  import { createSlice } from "@reduxjs/toolkit";
  import { fetchCart, addToCart, updateCartItem } from "./cartThunk";

  const initialState = {
    cart: null,
  items: [],
      loading: false,
      error: null,
      selectedItem: null,
  };

  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: { clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.cart_id = null;
    },},
    extraReducers: (builder) => {
      builder
        // Add to cart
        .addCase(addToCart.pending, (state) => {
          state.loading = true;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
          state.loading = false;
        state.cart = action.payload;
        state.items = action.payload?.items || [];
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
         state.loading = false;
        state.cart = action.payload;
        state.items = action.payload?.items || []; 
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
      });

    },
  });

  
export const { clearCart } = cartSlice.actions;
  export default cartSlice.reducer;
