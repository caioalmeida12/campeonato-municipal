import request from 'supertest';

import env from '@lib/utils/dotenv';
import EnvVariableNotLoadedError from '@lib/errors/envVariableNotLoadedError';
import EsporteModel from '@server/models/esporteModel';
import PosicaoModel from '@server/models/posicaoModel';

if (!env) throw new EnvVariableNotLoadedError("crudPosicoes.test.ts")

if (process.env.NODE_ENV == 'production') {
    throw new Error('Você não pode rodar testes em modo de produção');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('Você não pode rodar testes sem um banco de dados de teste');
}

describe("server/integration/crudPosicoes.test.ts", () => {
    const esportePost = {
        nome: "Teste posicoes",
        maximo_jogadores_por_time: 10,
        maximo_jogadores_titulares: 8,
    }

    const posicaoPost = {
        nome: "Posição do Esporte",
        fk_esporte_id: "indefinido",
    }
    
    describe("Fluxo Principal", () => {
        let esporte: EsporteModel;
        let posicao: PosicaoModel;

        it("deve criar um esporte", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_ESPORTES!).send(esportePost);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('nome');
            expect(response.body).toHaveProperty('maximo_jogadores_por_time');
            expect(response.body).toHaveProperty('maximo_jogadores_titulares');

            esporte = response.body
        });

        it("deve criar uma posicao", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_POSICOES!).send({...posicaoPost, fk_esporte_id: esporte.id});

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('nome');
            expect(response.body).toHaveProperty('fk_esporte_id');

            posicao = response.body
        });

        it("deve buscar uma posicao específica com base no nome", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_POSICOES}?nome=${posicao.nome}`);

            expect(response.status).toBe(200);
            expect(response.body[0]).toHaveProperty('nome');
            expect(response.body[0]).toHaveProperty('fk_esporte_id');
        });

        it("deve buscar uma posicao específica com base no id do esporte", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_POSICOES}?fk_esporte_id=${posicao.fk_esporte_id}`);

            expect(response.status).toBe(200);
            expect(response.body[0]).toHaveProperty('nome');
            expect(response.body[0]).toHaveProperty('fk_esporte_id');
        });

        it("deve buscar todas as posicoes", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_POSICOES}`);

            expect(response.status).toBe(200);
        });

        it.skip("deve atualizar uma posicao", async () => {
            const response = await request(process.env.API_URL).put(process.env.ROUTE_POSICOES!).send({
                ...posicao,
                nome: "Posição do Esporte 2",
            });

            expect(response.status).toBe(200);
            expect(response.body.nome).toBe("Posição do Esporte 2");
        }
        );

        it.skip("deve deletar uma posicao", async () => {
            const response = await request(process.env.API_URL).delete(`${process.env.ROUTE_POSICOES!}?id=${posicao.id}`);

            expect(response.status).toBe(200);
        });

    });
});