import EsporteModel from '@server/models/esporteModel';
import request from 'supertest';

import env from '@lib/utils/dotenv';
import EnvVariableNotLoadedError from '@lib/errors/envVariableNotLoadedError';

if (!env) throw new EnvVariableNotLoadedError("crudEsportes.test.ts")

if (process.env.NODE_ENV == 'production') {
    throw new Error('Você não pode rodar testes em modo de produção');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('Você não pode rodar testes sem um banco de dados de teste');
}

describe("server/integration/crudEsportes.test.ts", () => {
    const esportePost = {
        nome: "Futebol diferente",
        maximo_jogadores_por_time: 20,
        maximo_jogadores_titulares: 11,
    }

    describe("Fluxo Principal", () => {
        let esporte: EsporteModel;

        it("deve criar um esporte", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_ESPORTES!).send(esportePost);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('nome');
            expect(response.body).toHaveProperty('maximo_jogadores_por_time');
            expect(response.body).toHaveProperty('maximo_jogadores_titulares');

            esporte = response.body
        });

        it("deve buscar um esporte específico com base no id", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_ESPORTES!}?id=${esporte.id}`);

            expect(response.body[0].id).toBe(esporte.id);

            expect(response.status).toBe(200);
        });

        it("deve buscar um esporte específico com base no nome", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_ESPORTES!}?nome=${esporte.nome}`);

            expect(response.body[0].nome).toBe(esporte.nome);

            expect(response.status).toBe(200);
        });

        it("deve buscar um esporte específico com base no máximo de jogadores por time", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_ESPORTES!}?maximo_jogadores_por_time=${esporte.maximo_jogadores_por_time}`);

            const foundEsporte = response.body.find((esp: EsporteModel) => esporte.maximo_jogadores_por_time == esp.maximo_jogadores_por_time);
            expect(foundEsporte).toBeTruthy();

            expect(response.status).toBe(200);
        });

        it("deve buscar todos os esportes", async () => {
            const response = await request(process.env.API_URL).get(process.env.ROUTE_ESPORTES!);

            expect(response.status).toBe(200);
        });

        it("deve atualizar um esporte", async () => {
            const updatedEsporte = {
                ...esporte,
                nome: "Futebol Modificado",
                maximo_jogadores_por_time: 22,
                maximo_jogadores_titulares: 11,
            };

            const response = await request(process.env.API_URL).put(`${process.env.ROUTE_ESPORTES!}`).send(updatedEsporte);

            expect(response.status).toBe(200);
        });

        it("deve deletar um esporte", async () => {
            const response = await request(process.env.API_URL).delete(`${process.env.ROUTE_ESPORTES!}?id=${esporte.id}`);

            expect(response.status).toBe(200);
        });
    })

    describe("Fluxos Alternativos", () => {
        it("deve retornar 404 quando não encontrar um esporte", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_ESPORTES!}?id=0`);

            expect(response.status).toBe(404);
        });

        it("deve retornar 400 quando não enviar um campo (ex: nome)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_ESPORTES!).send({
                ...esportePost,
                nome: undefined,
            });

            expect(response.status).toBe(400);
        });

        it("deve retornar 400 quando o número máximo de jogadores por time for menor que o número máximo de jogadores titulares", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_ESPORTES!).send({
                ...esportePost,
                maximo_jogadores_por_time: 10,
                nmaximo_jogadores_titulares: 11,
            });

            expect(response.status).toBe(400);
        });
            
    });
});