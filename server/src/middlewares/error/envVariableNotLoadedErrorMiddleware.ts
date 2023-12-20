import EnvVariableNotLoadedError from "@lib/errors/envVariableNotLoadedError";
import { Request, Response, NextFunction } from "express"

const envVariableNotLoadedErrorMiddleWare = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof EnvVariableNotLoadedError) {
        if (process.env.NODE_ENV == "development") return res.status(500).json({ message: error.message, stack: error.stack })
        
        return res.status(500).json({ message: error.message })
    }

    next(error)
}

export default envVariableNotLoadedErrorMiddleWare;