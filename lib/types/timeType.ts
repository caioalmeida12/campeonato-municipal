import z from 'zod';

const timeSchema = z.object({
    id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    nome: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(128).refine((val) => val != 'undefined')
    ),
    localidade: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(128)
    ),
    responsavel: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(128)
    ),
    telefone: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(13)
    ),
    email: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(128)
    ),
    escudo: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(256)
    ),
    fk_esporte_id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    esporte: z.any().optional(),
});

export default timeSchema;
export type TimeType = z.infer<typeof timeSchema>;