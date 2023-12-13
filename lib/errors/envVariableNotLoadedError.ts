export default class EnvVariableNotLoadedError extends Error {
    constructor(variable: string) {
        super(`A variável .env ${variable} não pôde ser carregada, seja porque não está definida ou porque está definida com um valor inválido.`);
    }
}