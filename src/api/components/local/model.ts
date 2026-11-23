import { Schema, model } from "mongoose";

interface ILocal {
    nombre: string;
    direccion: string;
    portada?: string;
}

const localSchema = new Schema<ILocal>({
    nombre: { type: String, required: true, trim: true },
    direccion: { type: String, required: true },
    portada: { type: String },
});

export const Local = model<ILocal>("Local", localSchema);