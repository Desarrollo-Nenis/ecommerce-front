import { AuthProvider } from "@/interfaces/auth/auth-providers.enum";
import { z } from "zod";

// Primero defines los campos normalmente
export const registerFormSchema = z
  .object({
    nombre: z.string().min(2, "El nombre es requerido"),
    apellidos: z.string().min(2, "Los apellidos son requeridos"),
    correo: z
      .string()
      .email("El correo electrónico no es válido")
      .min(1, "El correo electrónico es requerido"),
    contrasena: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirma tu contraseña"),
    authProvider: z.enum(Object.values(AuthProvider) as [string, ...string[]]),
  })
  .refine((data) => data.contrasena === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export type RegisterPartialData = Partial<Omit<RegisterFormData, "confirmPassword">>;
export type LoginPartialData = Partial<Omit<RegisterFormData, "confirmPassword" | "name" | "lastName">>;
