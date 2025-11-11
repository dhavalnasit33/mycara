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
    getByUser: (user_id) => `/wishlists/user/${user_id}`,
    addItem: "/wishlists/items",
  },
  cart: {
    getAll: "/carts",
    addItem: "/carts/items",
    updateItem: "/carts/items",
    deleteCart: "/carts/items",
  },

}