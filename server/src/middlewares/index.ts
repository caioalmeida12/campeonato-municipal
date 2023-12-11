import helmet from "helmet";
import envVariableNotLoadedErrorMiddleWare from "./errors/envVariableNotLoadedErrorMiddleware";

const requestMiddlewares: Array<Function> = [
    helmet,
];

const errorMiddlewares: Array<Function> = [
    envVariableNotLoadedErrorMiddleWare
];

const responseMiddlewares: Array<Function> = [];

export {
    requestMiddlewares,
    errorMiddlewares,
    responseMiddlewares
}