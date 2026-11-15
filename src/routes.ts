import { Router } from "express";
import usuarioRoutes from "./api/components/usuario/routes.js";

// Router general: cada componente agrega acá una sola línea, por ejemplo
// router.use("/platos", platoRoutes);
const router = Router();

router.get("/salud", (_req, res) => {
    res.json({ ok: true, message: "FoodFind API funcionando" });
});

router.use("/auth", usuarioRoutes);

export default router;