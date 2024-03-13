import z from 'zod';

const fichaTecnicaSchema = z.object({
    fk_jogador_id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    fk_posicao_id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    fk_time_id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    altura: z.preprocess(
        (val) => Number(val),
        z.number().int().positive()
    ),
    peso: z.preprocess(
        (val) => Number(val),
        z.number().int().positive()
    ),
    membro_inferior_dominante: z.enum(['DIR', 'ESQ', 'AMB']),
    membro_superior_dominante: z.enum(['DIR', 'ESQ', 'AMB']),
    experiencia: z.enum(['AMADOR', 'MODERADO', 'VETERANO', 'PROFISSIONAL']),
    is_capitao: z.boolean()
});

export default fichaTecnicaSchema;
export type FichaTecnicaType = z.infer<typeof fichaTecnicaSchema>;