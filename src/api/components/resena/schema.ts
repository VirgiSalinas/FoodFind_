import {z}  from "zod";

export const crearResenaSchema = z.object({
    plato: z.string().regex(/^[0-9a-fA-F]{24}$/, "El ID del plato es inválidio"),
    puntuacion: z.number().min(0.5).max(5).multipleOf(0.5),
    comentario: z.string().trim().min(10).max(200)
});

export const editarResenaSchema = crearResenaSchema.
omit({plato: true})
.partial()
.refine((datos) => datos.puntuacion !== undefined || datos.comentario !== undefined, {
    message: "Debe agregar una puntuación o un comentario para editar la reseña",
});

export type CrearResenaDto = z.infer<typeof crearResenaSchema>;
export type EditarResenaDto = z.infer<typeof editarResenaSchema>;