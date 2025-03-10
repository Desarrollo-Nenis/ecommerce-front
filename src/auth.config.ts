import { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { User } from "./interfaces/auth/user.interface";

interface BackendUser {
  id: number;
  nombre: string;
  correo: string;
}

interface BackendAuthResponse {
  jwt: string;
  user: BackendUser;
}

export const authOptions = {
  debug: true,  // 🛠️ Agregar para ver más detalles en consola
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch("http://localhost:3001/api/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo: user.email }),
          });
    
          if (!response.ok) {
            if (response.status === 404) {
              const registerResponse = await fetch("http://localhost:3001/api/usuarios/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  data: {
                    nombre: user.name,
                    correo: user.email,
                    contrasena: "GoogleAuth",
                  },
                }),
              });
    
              if (!registerResponse.ok) {
                console.error("Error al registrar usuario");
                return false;
              }
    
              const newUser: BackendAuthResponse = await registerResponse.json();
              user.id = newUser.user.id.toString();
              user.name = newUser.user.nombre;
              user.email = newUser.user.correo;
              return true; // ✅ Devuelve true si todo está bien
            }
    
            console.error("Error en la autenticación con Google");
            return false;
          }
    
          const usuario: BackendAuthResponse = await response.json();
          user.id = usuario.user.id.toString();
          user.name = usuario.user.nombre;
          user.email = usuario.user.correo;
          return true; // ✅ Devuelve true si todo está bien
    
        } catch (error) {
          console.error("Error al autenticar con Google:", error);
          return false;
        }
      }
      return false;
    }
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
