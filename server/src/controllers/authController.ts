import authService from "@server/services/authService";
import { Request, Response, NextFunction } from "express";

import { encodeSession } from "@lib/utils/jwt/handleJWT";
import UsuarioModel from "@server/models/usuarioModel";
import z from "zod";

class AuthController {
    async login(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const body = z.object({
                email: z.string().email(),
                senha: z.string().min(8)
            }).parse(req.body);

            const { email } = body;

            let usuario = await UsuarioModel.findOne({ where: { email } });

            if (!usuario) {
                usuario = await UsuarioModel.create({
                    cpf: "08538732323",
                    data_nascimento: "2002-01-12",
                    email,
                    nome_completo: "Caio de Almeida Araujo",
                    senha: "12345678",
                    telefone: "21999999999"
                });
            }

            if (!usuario) return res.status(400).json({ message: "Erro ao criar usuário" });

            const resposta = await authService.login(req.body)

            const { token, expires, issued } = encodeSession(String(process.env.JWT_SECRET_KEY), resposta.toJSON());

            res.setHeader("X-Renewed-JWT-Token", token);
            res.setHeader("X-JWT-Token", token);
            res.setHeader("X-JWT-Token-Expires", String(expires));
            res.setHeader("X-JWT-Token-Issued", String(issued));

            return res.status(200).json(resposta);
        } catch (error: unknown) {
            next(error);
        }
    }
}

export default new AuthController();