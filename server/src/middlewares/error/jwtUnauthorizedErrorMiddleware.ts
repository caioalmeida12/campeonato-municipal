import JWTUnauthorizedError from "@lib/errors/jwtUnauthorizedError"
import { Request, Response, NextFunction } from "express"

const jwtUnauthorizedErrorMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof JWTUnauthorizedError) {
        if (process.env?.NODE_ENV == "development") return res.status(401).json({ message: error.message })
        
        return res.status(401).json({ message: error.message })
    }

    next(error)
}

export default () => jwtUnauthorizedErrorMiddleware;