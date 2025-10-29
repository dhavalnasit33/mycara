
import navbarReducer from "./features/navbar/navbarSlice";
import productsReducer from "./features/products/productsSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import pagesReducer from "./features/pages/pagesSlice";
import sizesReducer from "./features/sizes/sizesSlice";
import colorsReducer from "./features/colors/colorsSlice";

export const rootReducer = {
    navbar: navbarReducer,
    products: productsReducer,
    categories: categoriesReducer,
    pages: pagesReducer,
    sizes: sizesReducer,
    colors: colorsReducer,
};
