//D:\mycara\frontend\src\rootReducer.js
import authReducer from "./features/auth/authSlice";
import navbarReducer from "./features/navbar/navbarSlice";
import productsReducer from "./features/products/productsSlice";
import discountsReducer from './features/discounts/discountsSlice';
import categoriesReducer from "./features/categories/categoriesSlice";
import pagesReducer from "./features/pages/pagesSlice";
import sizesReducer from "./features/sizes/sizesSlice";
import colorsReducer from "./features/colors/colorsSlice";
import brandsReducer from "./features/brands/brandsSlice";
import typesReducer from "./features/types/typesSlice";
import fabricsReducer from "./features/fabrics/fabricsSlice";
import discountsReducer from "./features/discounts/discountsSlice";
import productLabelsReducer from "./features/productLabels/productLabelsSlice";
import wishlistReducer from "./features/wishlist/wishlistSlice";
import cartReducer from "./features/cart/cartSlice";

export const rootReducer = {
    auth: authReducer,
    navbar: navbarReducer,
    products: productsReducer,
    discounts: discountsReducer,
    categories: categoriesReducer,
    pages: pagesReducer,
    sizes: sizesReducer,
    colors: colorsReducer,
    brands: brandsReducer,
    types: typesReducer,
    fabrics: fabricsReducer,
    discounts: discountsReducer,
    productLabels: productLabelsReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
};
