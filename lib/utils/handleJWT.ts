// READ MORE:
// https://nozzlegear.com/blog/implementing-a-jwt-auth-system-with-typescript-and-node

import EnvVariableNotLoadedError from "@lib/errors/envVariableNotLoadedError";
import { DecodeResult, EncodeResult, ExpirationStatus, PartialSession, Session } from "@lib/types/jwtTypes";
import { decode, encode, TAlgorithm } from "jwt-simple";
// import { Decode } from "jwt-simple";

if (!["HS256", "HS384", "HS512, RS256"].includes(process.env.JWT_ENCODING_ALGORITHM as string)) throw new EnvVariableNotLoadedError("JWT_ENCODING_ALGORITHM");

export function encodeSession(secretKey: string, partialSession: PartialSession): EncodeResult {

    const algorithm: TAlgorithm = process.env.JWT_ENCODING_ALGORITHM as TAlgorithm;
    const issued = Date.now();
    const fifteenMinutesInMs = 15 * 60 * 1000;
    const expires = issued + fifteenMinutesInMs;
    const session: Session = {
        ...partialSession,
        issued: issued,
        expires: expires
    };

    return {
        token: encode(session, secretKey, algorithm),
        issued: issued,
        expires: expires
    };
}


export function decodeSession(secretKey: string, tokenString: string): DecodeResult {
    const algorithm: TAlgorithm = process.env.JWT_ENCODING_ALGORITHM as TAlgorithm;

    let result: Session;

    try {
        result = decode(tokenString, secretKey, false, algorithm);
    } catch (_e) {
        const e: Error = _e as Error;

        if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
            return {
                type: "invalid-token"
            };
        }

        if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
            return {
                type: "integrity-error"
            };
        }

        // Handle json parse errors, thrown when the payload is nonsense
        if (e.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token"
            };
        }

        throw e;
    }

    return {
        type: "valid",
        session: result
    }
}

export function checkExpirationStatus(token: Session): ExpirationStatus {
    const now = Date.now();
    
    if (token.expires > now) return "active";

    const threeHoursInMs = 3 * 60 * 60 * 1000;
    const threeHoursAfterExpiration = token.expires + threeHoursInMs;

    if (threeHoursAfterExpiration > now) return "grace";

    return "expired";
}