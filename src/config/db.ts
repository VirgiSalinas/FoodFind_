import mongoose from "mongoose";
import { config } from "./env.js";

export const conectarDB = async (): Promise<void> => {
    await mongoose.connect(config.mongodbUri);
    console.log("Conectado a MongoDB");
};