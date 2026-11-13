import { Types } from 'mongoose';
import { Resena } from './model.js';

type DatosNuevos = {
    usuario: string;
    plato: string;
    puntuacion: number;
    comentario: string;
};

type DatosEditados = {
    puntuacion?: number;
    comentario?: string;
};

const aObjectIds = (id: string[]) => id.map((i) => new Types.ObjectId(i));

export const crear = (datos: DatosNuevos) => Resena.create(datos);

export const buscarPorId = (id: string) => Resena.findById(id);

export const buscarPorUsuarioYPlato = (usuario: string, plato: string) =>
    Resena.findOne({ usuario, plato});

export const actualizar = (id: string, datos: DatosEditados) => 
    Resena.findByIdAndUpdate(id, datos, { new: true, runValidators: true });

export const eliminar = (id: string) => 
    Resena.findByIdAndDelete(id);



export const listarPorPlatos = async (platoIds: string[], pagina: number, limite: number) => {
  const filtro = { plato: { $in: aObjectIds(platoIds) } };
  const [datos, total] = await Promise.all([
    Resena.find(filtro)
      .sort({ createdAt: -1 })
      .skip((pagina - 1) * limite)
      .limit(limite)
      .populate("usuario", "nombre") // solo el nombre, nunca el password
      .populate("plato", "nombre")
      .lean(),
    Resena.countDocuments(filtro)
  ]);
  return { datos, total };
};


export const puntajeDePlatos = async (platoIds: string[]) => {
  const [fila] = await Resena.aggregate([
    { $match: { plato: { $in: aObjectIds(platoIds) } } },
    { $group: { _id: null, promedio: { $avg: "$puntuacion" }, total: { $sum: 1 } } }
  ]);
  return { promedio: fila?.promedio ?? null, totalResenas: fila?.total ?? 0 };
};



export const platoMasElegido = async (platoIds: string[]) => {
  const [fila] = await Resena.aggregate([
    { $match: { plato: { $in: aObjectIds(platoIds) } } },
    { $group: { _id: "$plato", promedio: { $avg: "$puntuacion" }, total: { $sum: 1 } } },
    { $sort: { total: -1, promedio: -1 } },
    { $limit: 1 },
    // Trae los datos del plato desde la colección "platos"
    { $lookup: { from: "platos", localField: "_id", foreignField: "_id", as: "plato" } },
    { $unwind: "$plato" }
  ]);
  if (!fila) return null;
  return {
    plato: { _id: fila.plato._id, nombre: fila.plato.nombre },
    promedio: fila.promedio,
    totalResenas: fila.total
  };
};