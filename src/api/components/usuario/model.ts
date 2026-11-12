import { Schema, model } from "mongoose";

export const ROLES = ["usuario", "admin"] as const;
export type Rol = (typeof ROLES)[number];

export interface IUsuario {
    nombre: string;
    email: string;
    password: string;
    rol: Rol;
}

const usuarioSchema = new Schema<IUsuario>(
    {
        nombre: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        // select: false → el hash nunca sale en las consultas, salvo que se pida con "+password"
        password: { type: String, required: true, select: false },
        rol: { type: String, enum: ROLES, default: "usuario" },
    },
    { timestamps: true },
);

export const Usuario = model<IUsuario>("Usuario", usuarioSchema);
