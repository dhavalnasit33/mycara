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
// <<<<<<< HEAD
//   heroBanners: {
//     getOne: "/hero-banners/active", // Make sure this is the correct endpoint path on your server
//   },
//   features: {
//     getAll: "/features",
// =======
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

  }
}