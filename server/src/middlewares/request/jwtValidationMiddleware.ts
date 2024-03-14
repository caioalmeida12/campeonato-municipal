import { DecodeResult, ExpirationStatus } from "@lib/types/jwtTypes";
import { Request, Response, NextFunction } from "express";
import { Session } from "@lib/types/jwtTypes";
import JWTUnauthorizedError from "@lib/errors/jwtUnauthorizedError";
import { checkExpirationStatus, decodeSession, encodeSession } from "@lib/utils/jwt/handleJWT";

const whiteList = ["/health", "/auth"];

const jwtValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (whiteList.includes(req.path)) return next();

    const reqHeader = "X-JWT-Token";
    const resHeader = "X-Renewed-JWT-Token";
    const header = req.header(reqHeader);
    
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
}

export default jwtValidationMiddleware;
