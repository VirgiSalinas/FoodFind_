import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // El repo tiene dos proyectos (Backend en la raíz y Frontend acá).
    // Le indicamos a Turbopack que la raíz del Frontend es esta carpeta.
    root: path.join(__dirname),

    // Conecta Tailwind con Turbopack: procesa los .css con Tailwind.
    // Lo generó create-next-app; no quitar.
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
