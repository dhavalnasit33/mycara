//D:\mycara\frontend\src\rootReducer.js
import navbarReducer from "./features/navbar/navbarSlice";
import productsReducer from "./features/products/productsSlice";
import categoriesReducer from "./features/categories/categoriesSlice";

import pagesReducer from "./features/pages/pagesSlice";

import heroBannerReducer from "./features/heroBanner/heroBannerSlice";

import sizesReducer from "./features/sizes/sizesSlice";
import colorsReducer from "./features/colors/colorsSlice";
import brandsReducer from "./features/brands/brandsSlice";
import typesReducer from "./features/types/typesSlice";
import fabricsReducer from "./features/fabrics/fabricsSlice";
import discountsReducer from "./features/discounts/discountsSlice";
import productLabelsReducer from "./features/productLabels/productLabelsSlice";


export const rootReducer = {
    navbar: navbarReducer,
    products: productsReducer,
    categories: categoriesReducer,
    pages: pagesReducer,

    heroBanner: heroBannerReducer,
    


    sizes: sizesReducer,
    colors: colorsReducer,
<<<<<<< HEAD
     brands: brandsReducer,

=======
    brands: brandsReducer,
    types: typesReducer,
    fabrics: fabricsReducer,
    discounts: discountsReducer,
    productLabels: productLabelsReducer,
>>>>>>> 9ec4dd4 (Resolved merge conflicts)
};
