import { UsuarioType } from "./usuarioType";

export interface User {
    id: number;
    dateCreated: number;
    username: string;
    password: string;
}

export interface Session extends UsuarioType{
    expires: number;
    issued: number;
}

export type PartialSession = Omit<UsuarioType, "issued" | "expires">;

export interface EncodeResult {
    token: string,
    expires: number,
    issued: number
}

export type DecodeResult =
    | {
          type: "valid";
          session: Session;
      }
    | {
          type: "integrity-error";
      }
    | {
          type: "invalid-token";
      };

export type ExpirationStatus = "expired" | "active" | "grace";