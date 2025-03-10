import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { UserToken } from "./interfaces/auth/user.interface";

const NEXT_PUBLIC_GOOGLE_GENERIC_PASSWORD =
  process.env.NEXT_PUBLIC_GOOGLE_GENERIC_PASSWORD!;

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        console.log("entro");
        console.log(NEXT_PUBLIC_GOOGLE_GENERIC_PASSWORD);

        try {
          const response = await fetch(
            "http://127.0.0.1:3001/api/usuarios/login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                correo: user.email,
                contrasena: "$Perico123",
              }),
            }
          );

          if (!response.ok) {
            if (response.status === 400) {
              const registerResponse = await fetch(
                "http://127.0.0.1:3001/api/usuarios/register",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    data: {
                      nombre: user.name,
                      correo: user.email,
                      contrasena: "$Perico123",
                    },
                  }),
                }
              );

              if (!registerResponse.ok) {
                console.error("Error al registrar usuario");
                return false;
              }

              const newUser: UserToken = await registerResponse.json();
              user = newUser;
              return true; // ✅ Devuelve true si todo está bien
            }

            console.error("Error en la autenticación con Google");
            return false;
          }

          const usuario: UserToken = await response.json();
          console.log(usuario);

          user = usuario;
          return true; // ✅ Devuelve true si todo está bien
        } catch (error) {
          console.error("Error al autenticar con Google:", error);
          return false;
        }
      }
      return false;
    },

    async jwt({ token, user }) {
      if (user) {
        token.data = user;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...(session.user ?? {}),
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          jwt: token.jwt as string, // 🔹 Pasamos el JWT a la sesión
        };
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
