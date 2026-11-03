// Error con código de estado HTTP. Se lanza con throw desde servicios o
// controladores, y el middleware de errores arma la respuesta.
export class HttpError extends Error {
    readonly status: number;

    constructor(status: number, mensaje: string) {
        super(mensaje);
        this.name = "HttpError";
        this.status = status;
    }

    static datosInvalidos(mensaje: string) {
        return new HttpError(400, mensaje);
    }

    static noAutorizado(mensaje = "Token no proporcionado o inválido") {
        return new HttpError(401, mensaje);
    }

    static prohibido(mensaje = "No tenés permiso para realizar esta acción") {
        return new HttpError(403, mensaje);
    }

    static noEncontrado(mensaje: string) {
        return new HttpError(404, mensaje);
    }

    static conflicto(mensaje: string) {
        return new HttpError(409, mensaje);
    }
}