// //D:\mycara\frontend\src\features\orders\orderSlice.js

// import { createSlice } from "@reduxjs/toolkit";
// import { fetchOrders, placeOrder } from "./orderThunk";

// const initialState = {
//   orders: [],
//   loading: false,
//   error: null,
//   orderPlaced: null,
// };

// const orderSlice = createSlice({
//   name: "orders",
//   initialState,
//   reducers: {
//     clearOrderPlaced(state) {
//       state.orderPlaced = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       // fetchOrders
//       .addCase(fetchOrders.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orders = action.payload;
//       })
//       .addCase(fetchOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // placeOrder
//       .addCase(placeOrder.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(placeOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orderPlaced = action.payload;
//       })
//       .addCase(placeOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearOrderPlaced } = orderSlice.actions;
// export default orderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchOrder, fetchUserOrders } from "./orderThunk";

const initialState = {
  orders: [],      
  order: null,
  total: 0,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CREATE ORDER
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
       state.orders.unshift(action.payload); 
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
      });
  },
});

export default orderSlice.reducer;
