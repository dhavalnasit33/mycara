import { createSlice } from "@reduxjs/toolkit";
import {
  bulkDeleteProducts,
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
  updateProductStatus,
} from "./productsThunk";

interface ProductVariant {
  _id: string;
  product_id: string;
  brand?: { _id: string; name: string }[];
  type?: { _id: string; name: string }[];
  fabric?: { _id: string; name: string }[];
  color_id: { _id: string; name: string } | string;
  size_id: { _id: string; name: string } | string;
  price: number;
  stock_quantity: number;
  sku: string;
  images: string[];
  labels: { _id: string; name: string }[] | string[];
  status: string;
  is_featured: boolean;
  is_best_seller: boolean;
  is_trending: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  category: { _id: string; name: string } | string;
  labels: { _id: string; name: string }[] | string[];
  images: string[];
  status: string;
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

interface ProductsState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
        state.total += 1;
      })
      // Update
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(updateProductStatus.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
        state.total -= 1;
      })
      // Bulk Delete
      .addCase(bulkDeleteProducts.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => !action.payload.includes(p._id)
        );
        state.total -= action.payload.length;
      });
  },
});

export default productSlice.reducer;
