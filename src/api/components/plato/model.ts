import { Schema, model, Types } from "mongoose";

interface IPlato {
    nombre: string;
    descripcion?: string;
    precio: number;
    local: Types.ObjectId;
    categoria: Types.ObjectId;
}

const platoSchema = new Schema<IPlato>({
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String },
    precio: {
        type: Number, required: true, validate: {
            validator: (v: number) => v > 0,
            message: "El precio debe ser mayor a 0"
        }
    },
    local: { type: Schema.Types.ObjectId, ref: "Local", required: true },
    categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true },
});

export const Plato = model<IPlato>("Plato", platoSchema);