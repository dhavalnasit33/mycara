import authReducer from "./features/auth/authSlice";
import productsReducer from "./features/products/productsSlice";
import categoriesReducer from "./features/categories/categoriesSlice";
import brandsReducer from "./features/brands/brandsSlice";
import typesReducer from "./features/types/typesSlice";
import fabricsReducer from "./features/fabrics/fabricsSlice";
import productLabelsReducer from "./features/productLabels/productLabelsSlice";
import sizesReducer from "./features/sizes/sizesSlice";
import colorsReducer from "./features/colors/colorsSlice";

export const rootReducer = {
  auth: authReducer,
  products: productsReducer,
  categories: categoriesReducer,
  brands: brandsReducer,
  types: typesReducer,
  fabrics: fabricsReducer,
   productLabels: productLabelsReducer,
   sizes: sizesReducer,
      colors: colorsReducer,
};
