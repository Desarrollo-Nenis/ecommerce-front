import * as z from "zod";

export const addressFormSchema = z.object({
  id: z.number().optional(),
  documentId: z.string().optional(),
  calle: z.string().min(1, "La calle es requerida"),
  ciudad: z.string().min(1, "La ciudad es requerida"),
  estado: z.string().min(1, "El estado es requerido"),
  codigoPostal: z
    .string()
    .min(5, "El código postal debe tener al menos 5 dígitos"),
  numeroExterior: z.string().min(1, "El número exterior es requerido"),
  numeroInterior: z.string().nullable(),
  referencia: z.string().optional(),
  usuario: z.string().min(1, "El nombre del usuario es requerido"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  publishedAt: z.date().optional(),
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;