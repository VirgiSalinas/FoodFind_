import { HttpError } from "../../../utils/http-error.js";
import * as resenaDao from "./dao.js";
import type { EditarResenaDto } from "./schema.js";

export const editar = async (id: string, usuarioId: string, datos: EditarResenaDto) => {
  const resena = await resenaDao.buscarPorId(id);
  if (!resena) throw HttpError.noEncontrado("La reseña no existe");
  if (resena.usuario.toString() !== usuarioId) {
    throw HttpError.prohibido("Solo podés editar tus propias reseñas");
  }
  return resenaDao.actualizar(id, datos);
};

export const eliminar = async (id: string, usuarioId: string, rol: string) => {
  const resena = await resenaDao.buscarPorId(id);
  if (!resena) throw HttpError.noEncontrado("La reseña no existe");

  
  if (resena.usuario.toString() !== usuarioId && rol !== "admin") {
    throw HttpError.prohibido("No tenés permiso para borrar esta reseña");
  }
  await resenaDao.eliminar(id);
};