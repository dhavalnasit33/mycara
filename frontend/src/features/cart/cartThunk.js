// features/cart/cartThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { ROUTES } from "../../services/routes";

// ✅ Fetch Cart
// export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
//   try {
//     const res = await api.get(ROUTES.cart.getAll);
//     return res.data.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
//   }
// });

// ✅ Add To Cart
export const addToCart = createAsyncThunk("cart/addToCart", async (product, { rejectWithValue }) => {
  try {
            const token = localStorage.getItem("token");
    const body = {
      productId: product._id,
      quantity: 1,
      variantId: product?.variants?.[0]?._id,
    };
    // const res = await api.post(ROUTES.cart.addItem, body);
    const res = await api.get(ROUTES.sizes.addItem, {
        headers: { Authorization: `Bearer ${token}` }, body
        });
    return res.data.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to add to cart");
  }
});


export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
  try {
    // ✅ get token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found. Please log in first.");
    }

    const response = await await api.get(ROUTES.cart.getAll, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Send token
      },
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

