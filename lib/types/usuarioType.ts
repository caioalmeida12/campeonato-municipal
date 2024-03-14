import z from "zod";

const usuarioSchema = z.object({
    id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    cpf: z.preprocess(
        (val) => String(val),
        z.string().length(11).regex(/^[0-9]+$/)
    ),
    nome_completo: z.preprocess(
        (val) => String(val),
        z.string().min(8).max(256).regex(RegExp("^(?!.*\\s{2,})(?!\\s)(?!.*\\s$)(?=.*\\s)[A-Za-zÀ-ÖØ-öø-ÿ\\s]+$"), "O nome deve conter apenas letras e espaços. Insira nome e sobrenome.")
    ),
    telefone: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(13).regex(/^[0-9]+$/)
    ),
    email: z.preprocess(
        (val) => String(val),
        z.string().email().max(128)
    ),
    senha: z.string().min(8).max(256),
    data_nascimento: z.preprocess(
        (val) => String(val),
        z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
    ),
});

export default usuarioSchema;
export type UsuarioType = z.infer<typeof usuarioSchema>;
