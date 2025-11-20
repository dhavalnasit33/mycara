  // // features/cart/cartSlice.js
  import { createSlice } from "@reduxjs/toolkit";
  import { fetchCart, addToCart, updateCartItem, deleteCartItem } from "./cartThunk";

  const initialState = {
    cart: null,
  items: [],
      loading: false,
      error: null,
      selectedItem: null,
      deletingItemId: null,
  };

  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: { clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.cart_id = null;
    },
    updateLocalQuantity: (state, action) => {
      const { item_id, quantity } = action.payload;
      const item = state.items.find((i) => i._id === item_id);
      if (item) {
        item.quantity = quantity;
      }
    },},
    extraReducers: (builder) => {
      builder
      
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
      
        .addCase(fetchCart.fulfilled, (state, action) => {
          state.loading = false;
          state.cart = action.payload;
          state.items = action.payload?.items || []; 
        })
   
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updatedItem = action.payload?.item;
        if (!updatedItem) return;
        const existingItem = state.items.find((i) => i._id === updatedItem._id);
        if (existingItem) {
          existingItem.quantity = updatedItem.quantity;
        }
      })


      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.deletingItemId = null;
        state.cart = action.payload;
        state.items = action.payload?.items || [];
      })
    },
  });

  
export const { clearCart } = cartSlice.actions;
  export default cartSlice.reducer;
