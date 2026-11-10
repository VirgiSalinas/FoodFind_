import { Schema, model } from "mongoose";

interface ICategoria {
    nombre: string;
    icono?: string;
}

const categoriaSchema = new Schema<ICategoria>({
    nombre: { type: String, required: true, unique: true, trim: true },
    icono: { type: String },
});

export const Categoria = model<ICategoria>("Categoria", categoriaSchema);
