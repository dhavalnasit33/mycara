//D:\mycara\frontend\src\features\orders\orderSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, placeOrder } from "./orderThunk";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  orderPlaced: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderPlaced(state) {
      state.orderPlaced = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // placeOrder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderPlaced = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderPlaced } = orderSlice.actions;
export default orderSlice.reducer;
