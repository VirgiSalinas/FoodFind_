import cors from "cors";
import express from "express";
import { manejadorErrores, rutaNoEncontrada } from "./middlewares/errores.js";
import routes from "./routes.js";

// Arma la aplicación: middlewares y rutas. No se conecta a la base
// ni abre el puerto (eso lo hace server.ts).
export const app = express();

// 1. Middlewares generales
app.use(cors());
app.use(express.json());

// 2. Rutas
app.use("/api", routes);

// 3. Errores: siempre al final
app.use(rutaNoEncontrada);
app.use(manejadorErrores);