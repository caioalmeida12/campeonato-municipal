import { DecodeResult, ExpirationStatus, Session } from "@lib/types/jwtTypes";
import { decodeSession, encodeSession } from "@lib/utils/jwt/handleJWT";
import { checkExpirationStatus } from "@lib/utils/jwt/handleJWT";
import { Request, Response, NextFunction } from "express";
import JWTUnauthorizedError from "@lib/errors/jwtUnauthorizedError";

const whiteListedRoutes = [
    "/health",
    "/login",
];

const jwtValidationMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (whiteListedRoutes.includes(req.path)) {
        next();
        return;
    }

    const reqHeader = "X-JWT-Token";
    const resHeader = "X-Renewed-JWT-Token";
    const header = req.header(reqHeader);
    
    if (error) {
        console.error(error);
        next(error);
        return;
    }
    
    if (!header) throw new JWTUnauthorizedError(`Authorization token is missing from the request header. Please add '${reqHeader}' header with a valid authorization token.`);
    
    const decodedSession: DecodeResult = decodeSession(String(process.env.JWT_SECRET_KEY), header);
    
    if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") throw new JWTUnauthorizedError(`Authorization token is invalid. Please create a new authorization token.`);
    
    const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session);

    if (expiration === "expired") throw new JWTUnauthorizedError(`Authorization token has expired. Please create a new authorization token.`);

    let session: Session;

    if (expiration === "grace") {
        const { token, expires, issued } = encodeSession(String(process.env.JWT_SECRET_KEY), decodedSession.session);
        session = {
            ...decodedSession.session,
            expires: expires,
            issued: issued
        };

        res.setHeader(resHeader, token);
    } else {
        session = decodedSession.session;
    }

    res.locals = {
        ...res.locals,
        session: session
    };

    next();

    return res;
}

export default jwtValidationMiddleware;