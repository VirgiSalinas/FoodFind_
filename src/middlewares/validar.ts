import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

// Valida req.body con un esquema de Zod. Si está bien, deja en req.body
// los datos ya limpios; si no, responde 400 con la lista de errores.
export const validarBody = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            mensaje: "Los datos enviados no son válidos",
            errores: resultado.error.issues.map((issue) => ({
                campo: issue.path.join("."),
                mensaje: issue.message,
            })),
        });
    }

    req.body = resultado.data;
    next();
};