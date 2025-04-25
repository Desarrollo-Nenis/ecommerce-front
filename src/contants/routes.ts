export const ROUTES = {
    HOME: "/",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    CATEGORIA: "/categoria",
    MARCA: "/marca",
    DASHBOARD: "/dashboard",
    PROFILE: "/profile",
    SETTINGS: "/settings",
    ADMIN: {
      USERS: "/admin/users",
      PRODUCTS: "/admin/products",
    },
  } as const;
export type Route = typeof ROUTES[keyof typeof ROUTES];  