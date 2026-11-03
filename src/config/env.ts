import "dotenv/config";

// Lee una variable obligatoria del .env y corta el arranque si falta.
const obligatoria = (nombre: string): string => {
    const valor = process.env[nombre];
    if (!valor) {
        throw new Error(`Falta la variable de entorno ${nombre}. Revisá tu archivo .env`);
    }
    return valor;
};

// Configuración única para todo el proyecto (patrón Singleton)
export const config = {
    port: Number(process.env.PORT) || 3000,
    mongodbUri: obligatoria("MONGODB_URI"),
    jwtSecret: obligatoria("JWT_SECRET"),
};
