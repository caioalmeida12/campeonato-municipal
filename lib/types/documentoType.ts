import z from 'zod';

const documentoSchema = z.object({
    fk_jogador_id: z.preprocess(
        (val) => String(val),
        z.string().uuid()
    ),
    tipo: z.enum([
        'RG', 
        'CPF', 
        'CNH', 
        'Passaporte', 
        'Certidão de Nascimento', 
        'Título de Eleitor', 
        'Carteira de Trabalho', 
        'Certificado de Reservista', 
        'Cartão do SUS', 
        'Carteira de Estudante', 
        'Cartão de Crédito', 
        'Carteira de Identidade Profissional', 
        'Carteira de Habilitação Internacional', 
        'Outro documento não listado'
    ]),
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

export default documentoSchema;
export type DocumentoType = z.infer<typeof documentoSchema>;