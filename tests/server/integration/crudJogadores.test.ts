import isSetupOK from '@server/core/setup';
import sequelize from '@server/database/connection';
import JogadorModel from '@server/models/jogadorModel';

import request from 'supertest'

if (process.env.NODE_ENV == 'production') {
    throw new Error('You cannot run tests in production mode');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('You cannot run tests without a test database');
}

describe("server/integration/crudJogadores.test.ts", () => {
    beforeAll(async () => {
        isSetupOK;
        await sequelize.sync();
        await sequelize.query("SELECT 1+1")

        await JogadorModel.destroy({
            truncate: true,
            force: true,
        });
    });

    describe("GET", () => {
        let jogador: any;

        beforeEach(async () => {
            jogador = await JogadorModel.create({
                nome_completo: "Teste da Silva",
                telefone: "12345678911",
                cpf: "12345678911",
                email: "asd@gmail.com"
            })
        })

        afterEach(async () => {
            await JogadorModel.destroy({
                truncate: true,
                force: true,
            });
        })

        it("deve buscar todos os jogadores", async () => {
            const response = await request(process.env.API_URL).get(String(process.env.ROUTE_JOGADORES));

            expect(response.status).toBe(200);
        });

        it("deve buscar um jogador específico com base no id", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?id=${jogador.getDataValue('id')}`);

            expect(response.status).toBe(200);
        });

        it("deve buscar um jogador específico com base no nome", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?nome=${jogador.getDataValue('nome_completo')}`);

            expect(response.status).toBe(200);
        });

        it("deve buscar um jogador específico com base no cpf", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?cpf=${jogador.getDataValue('cpf')}`);

            expect(response.status).toBe(200);
        });

        it("deve buscar um jogador específico com base no email", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?email=${jogador.getDataValue('email')}`);

            expect(response.status).toBe(200);
        });

        it("deve buscar um jogador específico com base no telefone", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?telefone=${jogador.getDataValue('telefone')}`);

            expect(response.status).toBe(200);
        });

        it("deve ser possível buscar um jogador com base em mais de um parâmetro", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?nome_completo=${jogador.getDataValue('nome_completo')}&cpf=${jogador.getDataValue('cpf')}`);

            expect(response.status).toBe(200);
        });

        it("deve retornar 404 quando não encontrar um jogador", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?id=0`);

            expect(response.status).toBe(404);
        });
    });

    describe("POST", () => {
        afterEach(async () => {
            await JogadorModel.destroy({
                truncate: true,
                force: true,
            });
        })

        it("deve criar um jogador", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send({
                nome_completo: "Teste da Silva",
                telefone: "12345678911",
                cpf: "12345678911",
                email: "email@email.com",
            });

            expect(response.status).toBe(201);
        });

        it("deve retornar 400 quando não enviar um campo (ex: nome)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send({
                telefone: "12345678911",
                cpf: "12345678911",
                email: "",
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });

        it("deve retornar 400 quando enviar um campo inválido (ex: telefone com dígitos a mais)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send({
                nome_completo: "Teste da Silva",
                telefone: "12345678911111",
                cpf: "12345678911",
                email: "email@email.com",
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });

        it("deve retornar 400 quando enviar um campo inválido (ex: nome com caracteres especiais)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send({
                nome_completo: "Teste da Silva 123",
                telefone: "12345678911",
                cpf: "12345678911",
                email: "email@email.com",
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });

        it("deve retornar 400 quando enviar um campo inválido (ex: nome sem sobrenome)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send({
                nome_completo: "Testador",
                telefone: "12345678911",
                cpf: "12345678911",
                email: "email@email.com",
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });
    })
});

