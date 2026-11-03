import { Router } from "express";

// Router general: cada componente agrega acá una sola línea, por ejemplo
// router.use("/platos", platoRoutes);
const router = Router();

router.get("/salud", (_req, res) => {
    res.json({ ok: true, message: "FoodFind API funcionando" });
});

export default router;