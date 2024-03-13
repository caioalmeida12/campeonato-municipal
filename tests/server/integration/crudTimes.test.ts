import request from 'supertest'

import env from '@lib/utils/dotenv';
import EnvVariableNotLoadedError from '@lib/errors/envVariableNotLoadedError';
import TimeModel from "@server/models/timeModel";
import EsporteModel from '@server/models/esporteModel';

if (!env) throw new EnvVariableNotLoadedError("crudResponsaveis.test.ts")

if (process.env.NODE_ENV == 'production') {
    throw new Error('Você não pode rodar testes em modo de produção');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('Você não pode rodar testes sem um banco de dados de teste');
}


describe("server/integration/crudTimes.test.ts", () => {
    const esportePost = {
        nome: "Futebol um",
        maximo_jogadores_por_time: 20,
        maximo_jogadores_titulares: 11
    }

    const timePost = {
        nome: "Time um",
        localidade: "Localidade Teste um",
        responsavel: "Responsável Teste um",
        telefone: "12345678909",
        email: "timeum@teste.com",
        escudo: "http://linkparaescudoum.com",
        fk_esporte_id: ""
    };

    describe("Fluxo Principal", () => {
        let esporte: EsporteModel;
        let time: TimeModel;

        it("deve criar um esporte", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_ESPORTES!).send(esportePost);

            expect(response.status).toBe(201);
            expect(response.body.nome).toBe(esportePost.nome);

            esporte = response.body;
            timePost.fk_esporte_id = response.body.id;
        });

        it("deve criar um time", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_TIMES!).send(timePost);

            expect(response.status).toBe(201);
            expect(response.body.nome).toBe(timePost.nome);

            time = response.body
        });

        it("deve buscar um time específico com base no id", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_TIMES!}?id=${time.id}`);

            console.table(response.body);

            expect(response.body[0].id).toBe(time.id);
            expect(response.status).toBe(200);
        });

        it("deve buscar todos os times", async () => {
            const response = await request(process.env.API_URL).get(process.env.ROUTE_TIMES!);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it.skip("deve atualizar um time", async () => {
            const updatedTime = { ...timePost, nome: "Novo Nome" };
            const response = await request(process.env.API_URL).put(`${process.env.ROUTE_TIMES!}/${time.id}`).send(updatedTime);

            expect(response.status).toBe(200);
            expect(response.body.nome).toBe("Novo Nome");
        });

        it.skip("deve deletar um time", async () => {
            const response = await request(process.env.API_URL).delete(`${process.env.ROUTE_TIMES!}/${time.id}`);

            expect(response.status).toBe(200);
        });

    })

    describe("Fluxos Alternativos", () => {
        it("deve retornar 404 quando não encontrar um time", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_TIMES!}?id=1234567890`);

            expect(response.status).toBe(404);
        });

        it("deve retornar 400 quando não enviar um campo (ex: nome)", async () => {
            const updatedTime = { ...timePost, nome: undefined };
            const response = await request(process.env.API_URL).post(process.env.ROUTE_TIMES!).send(updatedTime);

            expect(response.status).toBe(400);
        });
    });
});