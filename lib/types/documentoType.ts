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
    link: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(256)
    ),
    validade: z.date(),
    data: z.instanceof(Buffer),
    jogador: z.any().optional(),
});

export default DocumentoSchema;
export type DocumentoType = z.infer<typeof DocumentoSchema>;