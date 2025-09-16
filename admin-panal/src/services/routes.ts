export const ROUTES = {
  auth: {
    login: "/auth/login",
    me: "/auth/me",
    logout: "/auth/logout",
  },
  users: {
    list: "/users",
    get: (id: string) => `/users/${id}`,
    create: "/users",
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    bulkDelete: "/users/bulk-delete",
  },
  pages: {
    list: "/pages",
    get: (id: string) => `/pages/${id}`,
    create: "/pages",
    update: (id: string) => `/pages/${id}`,
    delete: (id: string) => `/pages/${id}`,
    bulkDelete: "/pages/bulk-delete",
  },
  newsCategories: {
    list: "/news-categories",
    get: (id: string) => `/news-categories/${id}`,
    create: "/news-categories",
    update: (id: string) => `/news-categories/${id}`,
    delete: (id: string) => `/news-categories/${id}`,
    bulkDelete: "/news-categories/bulk-delete",
  },
  news: {
    list: "/news",
    get: (id: string) => `/news/${id}`,
    create: "/news",
    update: (id: string) => `/news/${id}`,
    delete: (id: string) => `/news/${id}`,
    bulkDelete: "/news/bulk-delete",
  },
  payments: {
    list: "/payments",
    stats: "/payments/stats",
  },
};
