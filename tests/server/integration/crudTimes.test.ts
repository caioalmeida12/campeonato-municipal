import request from 'supertest'

import env from '@lib/utils/dotenv';
import EnvVariableNotLoadedError from '@lib/errors/envVariableNotLoadedError';
import TimeModel from '@server/models/timeModel';
import EsporteModel from '@server/models/esporteModel';

if (!env) throw new EnvVariableNotLoadedError("crudResponsaveis.test.ts")

if (process.env.NODE_ENV == 'production') {
    throw new Error('Você não pode rodar testes em modo de produção');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('Você não pode rodar testes sem um banco de dados de teste');
}

describe("server/integration/crudTimes.test.ts", () => {
    const timePost = {
        nome: "Time de Souza",
        localidade: "Cedro",
        responsavel: "Técnico de Souza",
        telefone: "12345678311",
        email: "time@teste.com",
        escudo: "https://www.google.com",
    }

    const esportePost = {
        nome: "Futebol de time",
        maximo_jogadores_por_time: 20,
        maximo_jogadores_titulares: 11,
    }

    describe("Fluxo Principal", () => {
        let time: TimeModel;
        let esporte: EsporteModel;

        it("deve criar um esporte", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_ESPORTES!).send(esportePost);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('nome');
            expect(response.body).toHaveProperty('maximo_jogadores_por_time');
            expect(response.body).toHaveProperty('maximo_jogadores_titulares');

            esporte = response.body
        });

        it("deve criar um time", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_TIMES!).send({...timePost, fk_esporte_id: esporte.id});

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('nome');
            expect(response.body).toHaveProperty('localidade');
            expect(response.body).toHaveProperty('responsavel');
            expect(response.body).toHaveProperty('telefone');
            expect(response.body).toHaveProperty('email');
            expect(response.body).toHaveProperty('escudo');

            time = response.body
        });

        // it("deve buscar um time específico com base no id", async () => {
        //     const response = await request(process.env.API_URL).get(`${process.env.ROUTE_TIMES!}?id=${time.id}`);

        //     expect(response.body[0].id).toBe(time.id);

        //     expect(response.status).toBe(200);
        // });

        // it("deve buscar um time específico com base no nome", async () => {
        //     const response = await request(process.env.API_URL).get(`${process.env.ROUTE_TIMES!}?nome=${time.nome}`);

        //     expect(response.body[0].nome).toBe(time.nome);

        //     expect(response.status).toBe(200);
        // });

        // it("deve buscar um time específico com base na localidade", async () => {
        //     const response = await request(process.env.API_URL).get(`${process.env.ROUTE_TIMES!}?localidade=${time.localidade}`);

        //     expect(response.body[0].localidade).toBe(time.localidade);

        //     expect(response.status).toBe(200);
        // });

    });
})