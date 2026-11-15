import type { Request, Response } from "express";
import { HttpError } from "../../../utils/http-error.js";
import * as usuarioService from "./service.js";

// req.body ya llega validado y limpio por validarBody

export const registro = async (req: Request, res: Response) => {
    const usuario = await usuarioService.registrar(req.body);
    res.status(201).json(usuario);
};

export const login = async (req: Request, res: Response) => {
    const resultado = await usuarioService.login(req.body);
    res.json(resultado);
};

// Va después de verificarToken, que deja el usuario en req.usuario
export const perfil = async (req: Request, res: Response) => {
    if (!req.usuario) {
        throw HttpError.noAutorizado();
    }
    const usuario = await usuarioService.perfil(req.usuario.id);
    res.json(usuario);
};
