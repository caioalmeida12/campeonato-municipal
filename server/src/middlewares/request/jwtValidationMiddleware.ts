// READ MORE:
// https://nozzlegear.com/blog/implementing-a-jwt-auth-system-with-typescript-and-node

import { DecodeResult, ExpirationStatus } from "@lib/types/jwtTypes";
import { decodeSession, encodeSession } from "@lib/utils/handleJWT";
import { checkExpirationStatus } from "@lib/utils/handleJWT";
import { Request, Response, NextFunction } from "express";
import { Session } from "@lib/types/jwtTypes";
import JWTUnauthorizedError from "@lib/errors/jwtUnauthorizedError";

const jwtValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
        // Automatically renew the session and send it back with the res
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

    // Set the session on res.locals object for routes to access
    res.locals = {
        ...res.locals,
        session: session
    };

    // Request has a valid or renewed session. Call next to continue to the authenticated route handler
    next();
}

export default () => jwtValidationMiddleware;