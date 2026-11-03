import { z } from "zod";

const LIMITE_MAXIMO = 50;

// Lee ?pagina= y ?limite= de la URL, con valores por defecto seguros
const paginacionSchema = z.object({
    pagina: z.coerce.number().int().min(1).catch(1),
    limite: z.coerce.number().int().min(1).max(LIMITE_MAXIMO).catch(10),
});

export interface Paginacion {
    pagina: number;
    limite: number;
    saltar: number;
}

export const leerPaginacion = (query: unknown): Paginacion => {
    const { pagina, limite } = paginacionSchema.parse(query ?? {});
    return { pagina, limite, saltar: (pagina - 1) * limite };
};

// Forma común de todas las respuestas paginadas
export const respuestaPaginada = <T>(datos: T[], total: number, { pagina, limite }: Paginacion) => ({
    datos,
    pagina,
    limite,
    total,
    totalPaginas: Math.ceil(total / limite),
});