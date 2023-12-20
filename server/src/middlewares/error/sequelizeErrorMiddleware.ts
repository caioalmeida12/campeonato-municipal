import { DatabaseError, ForeignKeyConstraintError, UniqueConstraintError, ValidationError } from "sequelize";

import { Request, Response, NextFunction } from "express";

const sequelizeErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    const response = {
        message: "Ocorreu um erro no banco de dados",
        stack: process.env.NODE_ENV == "development" ? error.stack : undefined,
        campos: [{
            nome: "",
            validacao: ""
        }]
    }

    if (error instanceof DatabaseError) {
        response.message = "Ocorreu um erro no banco de dados"
        return res.status(Number(process.env.SEQUELIZE_DATABASE_ERROR)).json(response)
    }

    if (error instanceof UniqueConstraintError) {
        response.message = "Você pode ter infringido uma ou mais restrições de campo que possuem valores necessáriamente únicos"
        response.campos = error.errors.map(error => {
            return {
                nome: error.path!,
                validacao: error.validatorKey!
            }
        })
        return res.status(Number(process.env.SEQUELIZE_UNIQUE_CONSTRAINT_ERROR)).json(response)
    }

    if (error instanceof ForeignKeyConstraintError) {
        response.message = "Não foi possível relacionar os dados que você enviou com os dados que já existem no banco de dados"
        return res.status(Number(process.env.SEQUELIZE_FOREIGN_KEY_CONSTRAINT_ERROR)).json(response)
    }

    if (error instanceof ValidationError) {
        response.message = "Você preencheu um ou mais campos com valores inválidos"

        response.campos = error.errors.map(error => {
            return {
                nome: error.path!,
                validacao: error.validatorKey!
            }
        })

        return res.status(Number(process.env.SEQUELIZE_VALIDATION_ERROR)).json(response)
    }

    next(error)
}

export default sequelizeErrorMiddleware;