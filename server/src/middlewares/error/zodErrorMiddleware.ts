import { NextFunction, Request, Response } from "express";

interface ZodIssue {
    path: string[];
    message: string;
    code: string;
    validation: string;
}

interface ZodError {
    name: string;
    message: string;
    issues: ZodIssue[];
    stack: string;
}

const zodErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error.name == "ZodError") {
        const response = {
            message: "",
            campos: (error as ZodError).issues.map((issue: ZodIssue) => { return {
                nome: issue.path[0],
                validacao: issue.validation
            }}),
            stack: (process.env.NODE_ENV == "development" ? error.stack : undefined)
        }

        response.message = (error as ZodError).issues.map((issue: ZodIssue) => `${issue.message} ${issue.validation ? `(método de validação: ${issue.validation})` : ""} [campo: ${issue.path[0]}]`).join(", ")
        
        return res.status(Number(process.env.ZOD_ERROR)).json(response)
    }

    next(error)
}

export default zodErrorMiddleware;