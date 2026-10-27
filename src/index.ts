import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ ok: true, message: "FoodFind API funcionando" });
});

const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log("Conectado a MongoDB");
        app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
    })
    .catch((err) => console.error("Error conectando a MongoDB:", err));
