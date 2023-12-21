import z from 'zod';

const enderecoSchema = z.object({
    fk_jogador_id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    logradouro: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(128)
    ),
    numero: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(8)
    ),
    bairro: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(64)
    ),
    cidade: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(64)
    ),
    cep: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(8)
    ),
    estado: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(64)
    ),
    pais: z.preprocess(
        (val) => String(val),
        z.string().min(1).max(64)
    ),
});

export default enderecoSchema;
export type EnderecoType = z.infer<typeof enderecoSchema>;