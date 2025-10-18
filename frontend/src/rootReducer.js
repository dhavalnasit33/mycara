
import navbarReducer from "./features/navbar/navbarSlice";
import productsReducer from "./features/products/productsSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import pagesReducer from "./features/pages/pagesSlice";

export const rootReducer = {
    navbar: navbarReducer,
    products: productsReducer,
    categories: categoriesReducer,
    pages: pagesReducer,
};
