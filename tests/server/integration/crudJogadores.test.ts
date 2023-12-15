import isSetupOK from '@server/core/setup';
import sequelize from '@server/database/connection';
import JogadorModel from '@server/models/jogadorModel';
import ResponsavelModel from '@server/models/responsavelModel';

import request from 'supertest'

if (process.env.NODE_ENV == 'production') {
    throw new Error('You cannot run tests in production mode');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('You cannot run tests without a test database');
}

describe("server/integration/crudJogadores.test.ts", () => {
    const jogadorPost = {
        nome_completo: "Teste da Silva",
        telefone: "12345678911",
        cpf: "12345678911",
        email: "asd@gmail.com",
        responsavel: {
            nome_completo: "Teste da Silva",
            telefone: "12345678911",
            cpf: "12345678911",
            email: "asd@gmail.com",
        }
    }

    beforeAll(async () => {
        isSetupOK;
        await sequelize.sync();
        await sequelize.query("SELECT 1+1")

        await JogadorModel.destroy({
            truncate: true,
            force: true,
            cascade: true,
        });
    });

    describe("GET", () => {
        let jogador: JogadorModel;

        beforeEach(async () => {
            jogador = await JogadorModel.create(jogadorPost, {
                include: ResponsavelModel,
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

        it("deve criar um jogador sem responsável", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send({
                ...jogadorPost,
                responsavel: undefined,
            });

            expect(response.status).toBe(201);
        });

        it("deve criar um jogador com responsável", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send(jogadorPost);

            expect(response.status).toBe(201);
        });

        it("deve retornar 400 quando não enviar um campo (ex: nome)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send({
                ...jogadorPost,
                nome_completo: undefined,
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });

        it("deve retornar 400 quando enviar um campo inválido (ex: telefone com dígitos a mais)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send({
                ...jogadorPost,
                telefone: "123456789111111",
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });

        it("deve retornar 400 quando enviar um campo inválido (ex: nome com caracteres especiais)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send({
                ...jogadorPost,
                nome_completo: "Teste da Silva 123",
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });

        it("deve retornar 400 quando enviar um campo inválido (ex: nome sem sobrenome)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send({
                ...jogadorPost,
                nome_completo: "Teste",
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });

        it("deve retornar 400 quando enviar um campo inválido no responsável (ex: cpf com dígitos a mais)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send({
                ...jogadorPost,
                responsavel: {
                    ...jogadorPost.responsavel,
                    cpf: "123456789111",
                }
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });
    })
});

