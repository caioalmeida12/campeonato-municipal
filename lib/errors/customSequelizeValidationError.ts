export class SequelizeValidationError extends Error {
    errors: { nome: string, validacao: string }[];

    constructor(message: string, errors: { nome: string, validacao: string }[]) {
        super(message);
        this.name = 'ValidationError';
        this.errors = errors
    }
}