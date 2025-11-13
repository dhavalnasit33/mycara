//D:\mycara\frontend\src\services\routes.js

export const ROUTES = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    logout: "/auth/logout",
  },
  navbar: {
  getAll: "/navbar",
  },
  products:{
    getAll: "/products",
    getById: (id) => `/products/${id}`,
  },
  categories:{
    getAll: "/categories",
  },
  pages:{
    getAll: "/pages",
  },
// <<<<<<< Updated upstream
// =======
  
// // <<<<<<< HEAD
// //   heroBanners: {
// //     getOne: "/hero-banners/active", // Make sure this is the correct endpoint path on your server
// //   },
// //   features: {
// //     getAll: "/features",
// // =======

// >>>>>>> Stashed changes
  sizes:{
    getAll:"/sizes",
    getById: (id) => `/sizes/${id}`,
  },
  colors:{
    getAll:"/colors",
    getById: (id) => `/colors/${id}`,
  },
  brands:{
    getAll:"/brands",
  },
  types:{
    getAll:"/types",
  },
  fabrics:{
    getAll:"/fabrics"
  },
  discounts:{
    getAll:"/discounts"
  },
  productLabels:{
    getAll: "/product-labels"
  },
  wishlist: {
    getAll: "/wishlists",
    addItem: "/wishlists/items",
    removeItem: "/wishlists/items",
    getByUser: (id) => `/wishlists/user/${id}`,
    bulkDelete: "/wishlists/bulk-delete",
  },
  cart: {
    getAll: "/carts",
    addItem: "/carts/items",
    updateItem: "/carts/items",
    deleteCart: "/carts/items",
  },

// <<<<<<< Updated upstream
// =======
//   },
//    discounts: {
//     getAll: "/discounts",
//     getById: (id) => `/discounts/${id}`,
//   }
  
// >>>>>>> Stashed changes
}