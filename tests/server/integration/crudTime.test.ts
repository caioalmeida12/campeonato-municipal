import request from 'supertest';

import env from '@lib/utils/dotenv';
import EnvVariableNotLoadedError from '@lib/errors/envVariableNotLoadedError';
import EsporteModel from '@server/models/timeModel';
import TimeModel from '@server/models/timeModel';

if (!env) throw new EnvVariableNotLoadedError("crudTimes.test.ts")

if (process.env.NODE_ENV == 'production') {
    throw new Error('Você não pode rodar testes em modo de produção');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('Você não pode rodar testes sem um banco de dados de teste');
}

describe("server/integration/crudTimes.test.ts", () => {
    const esportePost = {
        nome: "Teste times",
        maximo_jogadores_por_time: 10,
        maximo_jogadores_titulares: 8,
    }

    const timePost = {
        nome: "Time do Esporte",
        localidade: "Lá na casa do time",
        responsavel: "Zé do time",
        telefone: "88994495885",
        email: "time@teste.com",
        escudo: "indefinido",
        fk_esporte_id: "indefinido"
    }

    describe("Fluxo Principal", () => {
        let esporte: EsporteModel;
        let time: TimeModel;

        it("deve criar um esporte", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_ESPORTES!).send(esportePost);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('nome');
            expect(response.body).toHaveProperty('maximo_jogadores_por_time');
            expect(response.body).toHaveProperty('maximo_jogadores_titulares');

            esporte = response.body
        });

        it("deve criar um time", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_TIMES!).send({ ...timePost, fk_esporte_id: esporte.id });

            console.log(response.body)

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('nome');
            expect(response.body).toHaveProperty('localidade');
            expect(response.body).toHaveProperty('responsavel');
            expect(response.body).toHaveProperty('telefone');
            expect(response.body).toHaveProperty('email');
            expect(response.body).toHaveProperty('escudo');
            expect(response.body).toHaveProperty('fk_esporte_id');

            time = response.body
        });

        it("deve buscar um time específico com base no nome", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_TIMES}?nome=${time.nome}`);

            expect(response.status).toBe(200);
            expect(response.body[0]).toHaveProperty('nome');
            expect(response.body[0]).toHaveProperty('fk_esporte_id');
        });

        it("deve buscar um time específico com base na localidade", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_TIMES}?localidade=${time.localidade}`);

            expect(response.status).toBe(200);
            expect(response.body[0]).toHaveProperty('nome');
            expect(response.body[0]).toHaveProperty('fk_esporte_id');
        });

        it("deve buscar um time específico com base no responsavel", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_TIMES}?responsavel=${time.responsavel}`);

            expect(response.status).toBe(200);
            expect(response.body[0]).toHaveProperty('nome');
            expect(response.body[0]).toHaveProperty('fk_esporte_id');
        });

        it("deve buscar um time específico com base no telefone", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_TIMES}?telefone=${time.telefone}`);

            expect(response.status).toBe(200);
            expect(response.body[0]).toHaveProperty('nome');
            expect(response.body[0]).toHaveProperty('fk_esporte_id');
        });

        it("deve buscar um time específico com base no email", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_TIMES}?email=${time.email}`);

            expect(response.status).toBe(200);
            expect(response.body[0]).toHaveProperty('nome');
            expect(response.body[0]).toHaveProperty('fk_esporte_id');
        });

        it("deve buscar um time específico com base no id do esporte", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_TIMES}?fk_esporte_id=${time.fk_esporte_id}`);

            expect(response.status).toBe(200);
            expect(response.body[0]).toHaveProperty('nome');
            expect(response.body[0]).toHaveProperty('fk_esporte_id');
        });

        it("deve buscar todos os times", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_TIMES}`);

            expect(response.status).toBe(200);
        });

        it.skip("deve atualizar um time", async () => {
            const response = await request(process.env.API_URL).put(`${process.env.ROUTE_TIMES}`).send({
                ...time,
                nome: "Posição do Esporte 2",
            });

            expect(response.status).toBe(200);
            expect(response.body.nome).toBe("Posição do Esporte 2");
        }
        );

        it.skip("deve deletar um time", async () => {
            const response = await request(process.env.API_URL).delete(`${process.env.ROUTE_TIMES}?id=${time.id}`);

            expect(response.status).toBe(200);
        });

    });

});