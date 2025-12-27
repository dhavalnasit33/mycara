//D:\mycara\frontend\src\services\routes.js

import { Contact } from "lucide-react";

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
  footer:{
    getAll: "/footer",
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
    getAll: "/wishlists",
    addItem: "/wishlists/items",
    removeItem: "/wishlists/items",
    getByUser: (id) => `/wishlists/user/${id}`,
    bulkDelete: "/wishlists/bulk-delete",
  },
  cart: {
    getAll:"/carts",
    getById: (id) => `/carts/${id}`,
    addItem: "/carts/items",
    updateItem: "/carts/items",
    deleteCart: "/carts/items",
  },
  orders: {
    getAll: "/orders",
    getById: (id) => `/orders/${id}`,
    getUserOrders: (userId) => `/orders?user=${userId}`,
  },
  payments: {
    getAll: "/payments",
  },
  contact: {
    getAll: "/contact-us",
  },
  user: {
    updateOneProfile: "/users/me",
    updateProfile: (id) => `/users/${id}`,
  },
}