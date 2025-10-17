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
  },
  categories:{
    getAll: "/categories",
  },
  pages:{
    getAll: "/pages",
  },
  heroBanners: {
    getOne: "/hero-banners/active", // Make sure this is the correct endpoint path on your server
  }
}