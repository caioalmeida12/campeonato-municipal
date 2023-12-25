import z from 'zod';

const enderecoSchema = z.object({
    fk_jogador_id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    logradouro: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(128).refine((val) => val != 'undefined')
    ),
    numero: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(8)
    ),
    bairro: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(64).refine((val) => val != 'undefined')
    ),
    cidade: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(64).refine((val) => val != 'undefined')
    ),
    cep: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(8)
    ),
    estado: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(64).refine((val) => val != 'undefined')
    ),
    pais: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(64).refine((val) => val != 'undefined')
    ),
    jogador: z.any().optional(),
});

export default enderecoSchema;
export type EnderecoType = z.infer<typeof enderecoSchema>;