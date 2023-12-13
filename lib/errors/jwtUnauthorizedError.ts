export default class JWTUnauthorizedError extends Error {
    constructor(message?: string) {
        super(message ?? "Não autorizado");
    }
}