import { Schema, model, Types} from 'mongoose';

export interface IResena {
    usuario: Types.ObjectId;
    plato: Types.ObjectId;
    Puntuacion: number;
    comentario: string;
}

const resenaSchema = new Schema<IResena>({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    plato: { type: Schema.Types.ObjectId, ref: 'Plato', required: true },
    Puntuacion: { 
        type: Number, 
        required: true, 
        min: 0.5, 
        max: 5 },
    comentario: { 
        type: String, 
        required: true,
        trim: true, 
        minlegth: 10,
        maxlength: 200 }
});

resenaSchema.index({ usuario: 1, plato: 1 }, { unique: true });
resenaSchema.index({plato : 1});

export const Resena = model<IResena>('Resena', resenaSchema);

