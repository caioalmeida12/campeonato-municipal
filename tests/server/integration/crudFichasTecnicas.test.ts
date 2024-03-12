import request from 'supertest';

import env from '@lib/utils/dotenv';
import EnvVariableNotLoadedError from '@lib/errors/envVariableNotLoadedError';
import FichaTecnicaModel from '@server/models/fichaTecnicaModel';

if (!env) throw new EnvVariableNotLoadedError("crudJogadores.test.ts")

if (process.env.NODE_ENV == 'production') {
    throw new Error('Você não pode rodar testes em modo de produção');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('Você não pode rodar testes sem um banco de dados de teste');
}

describe("server/integration/crudFichaTecnica.test.ts", () => {
    const fichaTecnicaPost = {
        fk_jogador_id: "uuid",
        fk_posicao_id: "uuid",
        fk_time_id: "uuid",
        altura: 180,
        peso: 75,
        membro_inferior_dominante: 'DIR',
        membro_superior_dominante: 'ESQ',
        experiencia: 'AMADOR',
        is_capitao: true
    }

    describe("Fluxo Principal", () => {
        let fichaTecnica: FichaTecnicaModel;

        it("deve criar uma ficha técnica", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_FICHAS_TECNICAS!).send(fichaTecnicaPost);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('fk_jogador_id');
            expect(response.body).toHaveProperty('fk_posicao_id');
            expect(response.body).toHaveProperty('fk_time_id');
            expect(response.body).toHaveProperty('altura');
            expect(response.body).toHaveProperty('peso');
            expect(response.body).toHaveProperty('membro_inferior_dominante');
            expect(response.body).toHaveProperty('membro_superior_dominante');
            expect(response.body).toHaveProperty('experiencia');
            expect(response.body).toHaveProperty('is_capitao');

            fichaTecnica = response.body
        });

        it("deve buscar uma ficha técnica específica com base no id", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_FICHAS_TECNICAS!}?id=${fichaTecnica.id}`);

            expect(response.body[0].id).toBe(fichaTecnica.id);

            expect(response.status).toBe(200);
        });

        it("deve buscar uma ficha técnica específica com base no jogador", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_FICHAS_TECNICAS!}?fk_jogador_id=${fichaTecnica.fk_jogador_id}`);

            expect(response.body[0].fk_jogador_id).toBe(fichaTecnica.fk_jogador_id);

            expect(response.status).toBe(200);
        });

        it("deve buscar uma ficha técnica específica com base na posição", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_FICHAS_TECNICAS!}?fk_posicao_id=${fichaTecnica.fk_posicao_id}`);

            expect(response.body[0].fk_posicao_id).toBe(fichaTecnica.fk_posicao_id);

            expect(response.status).toBe(200);
        });

        it("deve buscar uma ficha técnica específica com base no id do time", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_FICHAS_TECNICAS!}?fk_time_id=${fichaTecnica.fk_time_id}`);

            expect(response.body[0].fk_time_id).toBe(fichaTecnica.fk_time_id);

            expect(response.status).toBe(200);
        });

        it("deve buscar todas as fichas técnicas", async () => {
            const response = await request(process.env.API_URL).get(process.env.ROUTE_FICHAS_TECNICAS!);

            expect(response.status).toBe(200);
        });

        it.skip("deve atualizar uma ficha técnica", async () => {
            const response = await request(process.env.API_URL).put(process.env.ROUTE_FICHAS_TECNICAS!).send({
                ...fichaTecnica,
                altura: 190,
            });

            expect(response.status).toBe(200);
            expect(response.body.altura).toBe(190);
        });

        it.skip("deve deletar uma ficha técnica", async () => {
            const response = await request(process.env.API_URL).delete(process.env.ROUTE_FICHAS_TECNICAS!).send({
                id: fichaTecnica.id,
            });

            expect(response.status).toBe(200);
        });        
    })

    describe("Fluxos Alternativos", () => {
        it("deve retornar 404 quando não encontrar uma ficha técnica", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_FICHAS_TECNICAS!}?id=0`);

            expect(response.status).toBe(404);
        });

        it("deve retornar 400 quando não enviar um campo (ex: nome)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_FICHAS_TECNICAS!).send({
                ...fichaTecnicaPost,
                fk_jogador_id: null,
            });

            expect(response.status).toBe(400);
        });

        it("deve retornar 400 quando enviar um campo inválido (ex: altura)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_FICHAS_TECNICAS!).send({
                ...fichaTecnicaPost,
                altura: -1,
            });

            expect(response.status).toBe(400);
        });
    });
});