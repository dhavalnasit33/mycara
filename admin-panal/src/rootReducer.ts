import authReducer from "./features/auth/authSlice";
import productsReducer from "./features/products/productsSlice";
import categoriesReducer from "./features/categories/categoriesSlice";

export const rootReducer = {
  auth: authReducer,
  products: productsReducer,
   categories: categoriesReducer,
};
