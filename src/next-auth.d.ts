import { DefaultSession, DefaultUser } from "next-auth";
import { UserToken } from "./interfaces/auth/user.interface";

/** Extendemos la interfaz User de NextAuth con nuestras propiedades adicionales */
export interface ExtendedUser extends DefaultUser, UserToken {}

/** Extendemos la interfaz Session de NextAuth para incluir nuestro usuario personalizado */
export interface ExtendedSession extends DefaultSession {
  user?: ExtendedUser;
}

// Declaramos el módulo "next-auth" para extender las interfaces originales
declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface User extends ExtendedUser {}  
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Session extends ExtendedSession {}
}
