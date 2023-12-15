import { NextFunction, Request, Response } from "express";

const zodErrorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error.name == "ZodError") {
        let response = {
            message: "",
            campos: error.issues.map((issue: any) => { return {
                nome: issue.path[0],
                validacao: issue.validation
            }}),
            stack: (process.env.NODE_ENV == "development" ? error.stack : undefined)
        }

        response.message = error.issues.map((issue: any) => `${issue.message} ${issue.validation ? `(método de validação: ${issue.validation})` : ""} [campo: ${issue.path[0]}]`).join(", ")
        
        return res.status(Number(process.env.ZOD_ERROR)).json(response)
    }

    next(error)
}

export default () => zodErrorMiddleware;