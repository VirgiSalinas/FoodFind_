import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ROLES, type Rol } from "../api/components/usuario/model.js";
import { config } from "../config/env.js";
import { HttpError } from "../utils/http-error.js";

// Datos del usuario que viajan en el JWT y quedan en req.usuario
export interface UsuarioToken {
    id: string;
    rol: Rol;
}

// Le avisa a TypeScript que req puede tener la propiedad usuario
declare global {
    namespace Express {
        interface Request {
            usuario?: UsuarioToken;
        }
    }
}

const esRol = (valor: unknown): valor is Rol => ROLES.includes(valor as Rol);

// Lee el token del header "Authorization: Bearer <token>", lo valida y
// deja los datos del usuario en req.usuario. Si falla, responde 401.
export const verificarToken = (req: Request, _res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        throw HttpError.noAutorizado();
    }

    let payload: string | jwt.JwtPayload;
    try {
        payload = jwt.verify(header.slice("Bearer ".length), config.jwtSecret);
    } catch {
        throw HttpError.noAutorizado();
    }

    if (typeof payload === "string" || typeof payload.id !== "string" || !esRol(payload.rol)) {
        throw HttpError.noAutorizado();
    }

    req.usuario = { id: payload.id, rol: payload.rol };
    next();
};

// Deja pasar solo a los roles indicados. Va después de verificarToken.
export const permitirRoles =
    (...roles: Rol[]) =>
    (req: Request, _res: Response, next: NextFunction) => {
        if (!req.usuario || !roles.includes(req.usuario.rol)) {
            throw HttpError.prohibido();
        }
        next();
    };

export const soloAdmin = permitirRoles("admin");
