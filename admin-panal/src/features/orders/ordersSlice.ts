import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  bulkDeleteOrders,
  updateOrderStatus,
} from "./ordersThunk";

interface OrderItem {
  _id: string;
  product_id: { name: string; price: number };
  variant_id?: {
    color_id?: { name: string };
    size_id?: { name: string };
  };
  quantity: number;
  price_at_order: number;
}

interface Order {
  _id: string;
  user_id: { name: string; email: string };
  coupon_id?: { code: string; discount_value: number };
  total_price: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

interface OrdersState {
  orders: Order[];
  total: number;
  loading: boolean;
  error: string | null;
  selectedOrder?: Order;
}

const initialState: OrdersState = {
  orders: [],
  total: 0,
  loading: false,
  error: null,
  selectedOrder: undefined,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Get order by ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedOrder = undefined;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update order
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (o) => o._id === action.payload._id
        );
        if (index !== -1) state.orders[index] = action.payload;
        if (state.selectedOrder?._id === action.payload._id)
          state.selectedOrder = action.payload;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })

      // Delete order
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter((o) => o._id !== action.payload);
        state.total -= 1;
      })

      // Bulk delete orders
      .addCase(bulkDeleteOrders.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (o) => !action.payload.includes(o._id)
        );
        state.total -= action.payload.length;
      });
  },
});

export default ordersSlice.reducer;
