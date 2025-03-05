import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    
    Google({
      clientId: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_WEBAPP_GOOGLE_CLIENT_SECRET,
      
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  
  
} satisfies NextAuthConfig);
