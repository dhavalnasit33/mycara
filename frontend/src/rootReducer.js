//D:\mycara\frontend\src\rootReducer.js
import navbarReducer from "./features/navbar/navbarSlice";
import productsReducer from "./features/products/productsSlice";
import categoriesReducer from "./features/categories/categoriesSlice";

import pagesReducer from "./features/pages/pagesSlice";
import heroBannerReducer from "./features/heroBanner/heroBannerSlice";

export const rootReducer = {
    navbar: navbarReducer,
    product: productsReducer,
    categories: categoriesReducer,
    pages: pagesReducer,
    heroBanner: heroBannerReducer,
    

};
