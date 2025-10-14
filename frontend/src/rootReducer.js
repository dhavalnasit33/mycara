
import navbarReducer from "./features/navbar/navbarSlice";
import productsReducer from "./features/products/productsSlice";

export const rootReducer = {
    navbar: navbarReducer,
    product: productsReducer,
};
