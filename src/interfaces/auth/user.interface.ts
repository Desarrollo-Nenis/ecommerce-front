import { AuthProvider } from "./auth-providers.enum";

export interface User {
  id: number;
  documentId: string;
  name: string | null;
  lastName: string;
  email: string | null;
  password: string;
  authProvider:AuthProvider;
  rol: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
}

export interface UserToken {
  jwt: string;
  user: User;
}

// export interface RegisterData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

// export interface LoginData {
//   provider: AuthProvider;
//   email: string;
//   password: string;
// }


