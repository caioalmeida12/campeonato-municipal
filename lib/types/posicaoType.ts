import z from 'zod';

const posicaoSchema = z.object({
    fk_esporte_id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    nome: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(128)
    ),
    esporte: z.any().optional(),
});

export default posicaoSchema;
export type PosicaoType = z.infer<typeof posicaoSchema>;