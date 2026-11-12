import { Usuario, type IUsuario } from "./model.js";

// Única capa que consulta la colección de usuarios

export const crear = (datos: Pick<IUsuario, "nombre" | "email" | "password">) => Usuario.create(datos);

export const existeEmail = async (email: string): Promise<boolean> => (await Usuario.exists({ email })) !== null;

// Incluye el hash del password: solo para comparar en el login
export const buscarPorEmailConPassword = (email: string) => Usuario.findOne({ email }).select("+password").lean();

// Sin password (el esquema lo excluye por defecto)
export const buscarPorId = (id: string) => Usuario.findById(id).lean();
