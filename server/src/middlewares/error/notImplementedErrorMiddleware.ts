import NotImplementedError from "@lib/errors/notImplementedError"
import { Request, Response, NextFunction } from "express"

const notImplementedErrorMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof NotImplementedError) {
        if (process.env.NODE_ENV == "development") return res.status(501).json({ message: error.message, stack: error.stack })
        
        return res.status(501).json({ message: error.message })
    }

    next(error)
}

export default () => notImplementedErrorMiddleware;