import { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { loginUser, registerUser } from "./services/auth/auth-services";
import { UserToken } from "./interfaces/auth/user.interface";
import { AuthProvider } from "@/interfaces/auth/auth-providers.enum";
import { ExtendedJWT, ExtendedUser } from "./next-auth";
import { LoginPartialData, RegisterPartialData } from "./modules/common/components/auth/register/register-schema";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Correo y contraseña son requeridos");
        }

        const loginData: RegisterPartialData = {
          email: credentials.email as string,
          password: credentials.password as string,
          authProvider: AuthProvider.Credentials,
        };

        try {
          const userToken = await loginUser(loginData);
          return userToken; // Devolvemos el UserToken directamente
        } catch (error) {
          console.error("Error en login manual:", error);
          throw new Error("Credenciales inválidas");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false;

      if (account.provider === "google" && user.email) {
        try {
          const loginData: LoginPartialData = {
            email: user.email,
            authProvider: AuthProvider.Google,
          };

          let userToken: UserToken;
          try {
            userToken = await loginUser(loginData);
          } catch {
            const registerData: RegisterPartialData = {
              email: user.email,
              authProvider: AuthProvider.Google,
              name: user.name || "",
            };

            // console.log("registerData",registerData);
            
            userToken = await registerUser(registerData);
          }

          (user as ExtendedUser).jwt = userToken.jwt;
          (user as ExtendedUser).user = userToken.user;

          return true;
        } catch (error) {
          console.error("Error en autenticación con Google:", error);
          return false;
        }
      }

      if (account.provider === "credentials") {
        return true;
      }

      return false;
    },

    async jwt({ token, user }) {
      if (user) {
        token.user = user as ExtendedUser;
      }
      return token;
    },

    async session({ session, token }) {
      const extendedToken = token as ExtendedJWT; // CAST CORRECTO
      if (extendedToken.user) {
        session.user = {
          ...extendedToken.user,
          id: extendedToken.user.user.id.toString(), // Convertir a string si es necesario
          email: extendedToken.user.user.email || "",
          emailVerified: null, // Set to null or appropriate value
        }; // OK
      }
      return session;
    },
  },
};

export default authConfig;
