import ZodError from "@lib/errors/customZodError";
import usuarioRepository from "@server/repositories/usuarioRepository";
import bcrypt from 'bcrypt';

class AuthService {
    async login(body: { email: string, senha: string }) {
        const usuario = await usuarioRepository.findByEmail(body.email);

        if (!usuario) throw new ZodError("Email ou senha incorretos", [{
            code: "invalid",
            message: "Email ou senha incorretos",
            path: ["email"],
            validation: "email",
        }]);

        const isPasswordCorrect = await bcrypt.compare(body.senha, usuario.senha);
        if (!isPasswordCorrect) throw new ZodError("Email ou senha incorretos", [{
            code: "invalid",
            message: "Email ou senha incorretos",
            path: ["password"],
            validation: "password",
        }]);

        return usuario;
    }
}

export default new AuthService();