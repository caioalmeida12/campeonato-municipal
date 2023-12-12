import helmet from "helmet";
import envVariableNotLoadedErrorMiddleWare from "./errors/envVariableNotLoadedErrorMiddleware";
import jwtValidationMiddleware from "./request/jwtValidationMiddleware";
import jwtUnauthorizedErrorMiddleware from "./errors/jwtUnauthorizedErrorMiddleware";
import sequelizeNullishResultErrorMiddleware from "./errors/sequelizeNullishResultErrorMiddleware";

const requestMiddlewares: Array<Function> = [
    helmet,
];

if (process.env.AUTHENTICATION_NEEDED === "true") requestMiddlewares.push(jwtValidationMiddleware);

const errorMiddlewares: Array<Function> = [
    envVariableNotLoadedErrorMiddleWare,
    jwtUnauthorizedErrorMiddleware,
    sequelizeNullishResultErrorMiddleware
];

const responseMiddlewares: Array<Function> = [];

export {
    requestMiddlewares,
    errorMiddlewares,
    responseMiddlewares
}