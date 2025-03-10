import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});
export const registerSchema = z
  .object({
    email: z.string().email("Ingresa un correo válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "las contreaseñas no coinciden",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  full_name: z.string().min(1, "El nombre es obligatorio"),
  phone: z.string().optional(),
});
