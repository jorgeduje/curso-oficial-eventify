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

export const eventSchema = z
  .object({
    title: z.string().min(1, "El titulo es obligatorio"),
    start: z.date({
      required_error: "La fecha de inicio es obligatoria",
      invalid_type_error: "la fecha de inicio no es valida",
    }),
    end: z.date({
      required_error: "La fecha de fin es obligatoria",
      invalid_type_error: "la fecha de fin no es valida",
    }),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.end > data.start;
    },
    {
      message: "La fecha de fin debe ser posterior a la fecha de inciio",
      path: ["end"],
    }
  );
