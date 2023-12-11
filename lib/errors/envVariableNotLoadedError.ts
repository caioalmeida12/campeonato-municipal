export class EnvVariableNotLoadedError extends Error {
    constructor(variable: string) {
        super(`.env variable ${variable} could not be loaded`);
    }
}