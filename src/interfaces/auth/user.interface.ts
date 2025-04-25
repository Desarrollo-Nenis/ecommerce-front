export interface User {
  id: number;
  documentId: string;
  nombre: string | null;
  apellidos: string;
  correo: string | null;
  contrasena: string;
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

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
