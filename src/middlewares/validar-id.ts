import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// Revisa que el :id de la ruta tenga formato de ObjectId antes de consultar la base
export const validarId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (typeof id !== "string" || !mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json({ mensaje: "El ID no es válido" });
    }

    next();
};