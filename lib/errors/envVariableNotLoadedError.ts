export default class EnvVariableNotLoadedError extends Error {
    constructor(variable: string) {
        super(`.env variable ${variable} could not be loaded, either because it is not set or because it is set to an invalid value.`);
    }
}