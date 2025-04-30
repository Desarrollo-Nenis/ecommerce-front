export const BACKEND_ROUTES = {
    LOGIN: "usuarios/login",
    REGISTER: "usuarios/register",
    
  } as const;
export type Route = typeof BACKEND_ROUTES[keyof typeof BACKEND_ROUTES];  