import helmet from "helmet";
import envVariableNotLoadedErrorMiddleWare from "./error/envVariableNotLoadedErrorMiddleware";
import jwtValidationMiddleware from "./request/jwtValidationMiddleware";
import jwtUnauthorizedErrorMiddleware from "./error/jwtUnauthorizedErrorMiddleware";
import sequelizeEmptyResponseMiddleware from "./response/sequelizeEmptyResponseMiddleware";
import sequelizeErrorMiddleware from "./error/sequelizeErrorMiddleware";
import zodErrorMiddleware from "./error/zodErrorMiddleware";
import syntaxErrorNotValidJSONErrorMiddleware from "./error/syntaxErrorNotValidJSONErrorMiddleware";

const requestMiddlewares: Array<Function> = [
    helmet,
];

if (process.env.AUTHENTICATION_NEEDED === "true") requestMiddlewares.push(jwtValidationMiddleware);

const errorMiddlewares: Array<Function> = [
    envVariableNotLoadedErrorMiddleWare,
    jwtUnauthorizedErrorMiddleware,
    sequelizeErrorMiddleware,
    zodErrorMiddleware,
    syntaxErrorNotValidJSONErrorMiddleware
];

const responseMiddlewares: Array<Function> = [
    sequelizeEmptyResponseMiddleware,
];

export {
    requestMiddlewares,
    errorMiddlewares,
    responseMiddlewares
}