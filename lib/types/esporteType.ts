import z from "zod"

const esporteSchema = z.object({
    id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    nome: z.preprocess(
        (val) => String(val),
        z.string().min(2).max(64)
    ),
    maximo_jogador_por_time: z.preprocess(
        (val) => Number(val),
        z.number().int().positive().max(255)
    ),
    maximo_jogadores_titulares: z.preprocess(
        (val) => Number(val),
        z.number().int().positive().max(255)
    ),
})

export default esporteSchema
export type EsporteType = z.infer<typeof esporteSchema>