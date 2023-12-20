import envVariableNotLoadedErrorMiddleWare from "./error/envVariableNotLoadedErrorMiddleware";
// import jwtValidationMiddleware from "./request/jwtValidationMiddleware";
import jwtUnauthorizedErrorMiddleware from "./error/jwtUnauthorizedErrorMiddleware";
import sequelizeEmptyResponseMiddleware from "./response/sequelizeEmptyResponseMiddleware";
import sequelizeErrorMiddleware from "./error/sequelizeErrorMiddleware";
import zodErrorMiddleware from "./error/zodErrorMiddleware";
import syntaxErrorNotValidJSONErrorMiddleware from "./error/syntaxErrorNotValidJSONErrorMiddleware";

import { Request, Response, NextFunction } from "express"

const requestMiddlewares: Array<(error: Error, req: Request, res: Response, next: NextFunction) => Response | undefined> = [
];

// if (process.env.AUTHENTICATION_NEEDED === "true") requestMiddlewares.push(jwtValidationMiddleware);

const errorMiddlewares: Array<(error: Error, req: Request, res: Response, next: NextFunction) => Response | undefined> = [
    envVariableNotLoadedErrorMiddleWare,
    jwtUnauthorizedErrorMiddleware,
    sequelizeErrorMiddleware,
    syntaxErrorNotValidJSONErrorMiddleware,
    zodErrorMiddleware,
];

const responseMiddlewares: Array<(error: Error, req: Request, res: Response, next: NextFunction) => Response | undefined> = [
    sequelizeEmptyResponseMiddleware,
];

export {
    requestMiddlewares,
    errorMiddlewares,
    responseMiddlewares
}