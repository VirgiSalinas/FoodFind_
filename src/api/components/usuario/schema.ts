import { z } from "zod";

// El email se limpia (sin espacios, en minúsculas) antes de validar el formato
const emailSchema = z
    .string({ error: "El email es obligatorio" })
    .trim()
    .toLowerCase()
    .pipe(z.email("El email no es válido"));

export const registroSchema = z.object({
    nombre: z
        .string({ error: "El nombre es obligatorio" })
        .trim()
        .min(2, "El nombre debe tener al menos 2 caracteres")
        .max(50, "El nombre puede tener como máximo 50 caracteres"),
    email: emailSchema,
    // 72 es el máximo que bcrypt tiene en cuenta
    password: z
        .string({ error: "La contraseña es obligatoria" })
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(72, "La contraseña puede tener como máximo 72 caracteres"),
});

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string({ error: "La contraseña es obligatoria" }).min(1, "La contraseña es obligatoria"),
});

export type RegistroDto = z.infer<typeof registroSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
