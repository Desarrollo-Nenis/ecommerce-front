import { z } from "zod"

// Primero defines los campos normalmente
export const registerFormSchema = z
  .object({
    firstName: z.string().min(1, "El nombre es requerido"),
    lastName: z.string().min(1, "Los apellidos son requeridos"),
    email: z
      .string()
      .email("El correo electrónico no es válido")
      .min(1, "El correo electrónico es requerido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .nonempty("La contraseña es requerida"),
    confirmPassword: z
      .string()
      .min(1, "Confirma tu contraseña"),
  })
  // Luego haces un refine sobre el objeto completo
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // Le dices que el error vaya sobre confirmPassword
  })

export type RegisterFormData = z.infer<typeof registerFormSchema>
