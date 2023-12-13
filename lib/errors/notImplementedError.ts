export default class NotImplementedError extends Error {
    constructor(message?: string) {
        super(`Funcionalidade não implementada. ${message ?? ""}`);
    }
}