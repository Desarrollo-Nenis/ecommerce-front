export const BACKEND_ROUTES = {
    LOGIN: "usuarios/login",
    REGISTER: "usuarios/register",
    ADDRESS: "direccions",
    CATEGORIES: "direccions",
    PAYMENTS_CONFIGURATION: "configuracion-pago",
    INFORMATION_ECOMMERCE: "informacion-tienda",
    INVENTORY: "inventarios",
    BRANCH: "marcas",
    PRODUCTS: "productos",
    SUBCATEGORIES: "subcategorias",
    USERS: "usuarios",
  } as const;
export type Route = typeof BACKEND_ROUTES[keyof typeof BACKEND_ROUTES];  