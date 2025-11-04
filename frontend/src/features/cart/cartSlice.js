// // features/cart/cartSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import { fetchCart, addToCart } from "./cartThunk";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload || [];
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(addToCart.fulfilled, (state, action) => {
//         // ✅ Push only if product is not null
//         if (action.payload) {
//           state.items.push(action.payload);
//         }
//       })
//       .addCase(addToCart.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "./cartThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ Correct mapping
        state.items = action.payload?.data?.carts || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load cart";
      });
  },
});

export default cartSlice.reducer;
