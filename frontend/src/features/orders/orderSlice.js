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
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.total = 0;
    },
  },
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

      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })

      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
      });
  },
});

export const {clearOrders} = orderSlice.actions;
export default orderSlice.reducer;
