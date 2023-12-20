import { Request, Response, NextFunction } from "express"

const syntaxErrorNotValidJsonErrorMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof SyntaxError) {
        if (!error.message.includes("JSON")) {
            next(error)
            return undefined
        }

        error.message = "O formato da sua requisição não é um JSON válido";

        if (process.env.NODE_ENV == "development") return res.status(400).json({ message: error.message, stack: error.stack })
        
        return res.status(400).json({ message: error.message })
    }

    next(error)
}

export default syntaxErrorNotValidJsonErrorMiddleware;