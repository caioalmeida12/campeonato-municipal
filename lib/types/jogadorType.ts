import z from "zod"

const jogadorSchema = z.object({
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
    )
})

export default jogadorSchema
export type JogadorType = z.infer<typeof jogadorSchema>