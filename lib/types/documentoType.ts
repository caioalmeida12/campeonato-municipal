import z from 'zod';

const DocumentoSchema = z.object({
    fk_jogador_id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    tipo: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(128).refine((val) => val != 'undefined')
    ),
    iv: z.preprocess(
        (val) => String(val),
        z.string()
    ).nullable(),
    validade: z.preprocess(
        (val) => new Date(String(val)),
        z.date(),
    ),
    data: z.string(),
    jogador: z.any().optional(),
});

export default DocumentoSchema;
export type DocumentoType = z.infer<typeof DocumentoSchema>;