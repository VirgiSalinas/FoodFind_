import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Types } from "mongoose";
import { config } from "../../../config/env.js";
import { HttpError } from "../../../utils/http-error.js";
import * as usuarioDao from "./dao.js";
import type { Rol } from "./model.js";
import type { LoginDto, RegistroDto } from "./schema.js";

const RONDAS_BCRYPT = 10;
const DURACION_TOKEN = "1d";

// Lo único que se devuelve de un usuario: nunca el password
interface UsuarioPublico {
    id: string;
    nombre: string;
    email: string;
    rol: Rol;
}

const aPublico = (usuario: { _id: Types.ObjectId; nombre: string; email: string; rol: Rol }): UsuarioPublico => ({
    id: usuario._id.toString(),
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
});

export const registrar = async (datos: RegistroDto): Promise<UsuarioPublico> => {
    if (await usuarioDao.existeEmail(datos.email)) {
        throw HttpError.conflicto("El email ya está registrado");
    }

    const password = await bcrypt.hash(datos.password, RONDAS_BCRYPT);
    const usuario = await usuarioDao.crear({ nombre: datos.nombre, email: datos.email, password });
    return aPublico(usuario);
};

export const login = async (datos: LoginDto): Promise<{ token: string; usuario: UsuarioPublico }> => {
    const usuario = await usuarioDao.buscarPorEmailConPassword(datos.email);

    // Mismo mensaje si no existe el email o si la contraseña no coincide,
    // para no revelar qué emails están registrados
    if (!usuario || !(await bcrypt.compare(datos.password, usuario.password))) {
        throw HttpError.noAutorizado("Email o contraseña incorrectos");
    }

    const publico = aPublico(usuario);
    const token = jwt.sign({ id: publico.id, rol: publico.rol }, config.jwtSecret, { expiresIn: DURACION_TOKEN });
    return { token, usuario: publico };
};

export const perfil = async (id: string): Promise<UsuarioPublico> => {
    const usuario = await usuarioDao.buscarPorId(id);
    if (!usuario) {
        throw HttpError.noEncontrado("El usuario no existe");
    }
    return aPublico(usuario);
};
