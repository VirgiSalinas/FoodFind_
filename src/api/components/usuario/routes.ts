import { Router } from "express";
import { verificarToken } from "../../../middlewares/auth.js";
import { validarBody } from "../../../middlewares/validar.js";
import * as usuarioController from "./controller.js";
import { loginSchema, registroSchema } from "./schema.js";

// Se monta en /api/auth
const router = Router();

router.post("/registro", validarBody(registroSchema), usuarioController.registro);
router.post("/login", validarBody(loginSchema), usuarioController.login);
router.get("/perfil", verificarToken, usuarioController.perfil);

export default router;
