import JogadorModel from '@server/models/jogadorModel';
import request from 'supertest'

import env from '@lib/utils/dotenv';
import EnvVariableNotLoadedError from '@lib/errors/envVariableNotLoadedError';

if (!env) throw new EnvVariableNotLoadedError("crudJogadores.test.ts")

if (process.env.NODE_ENV == 'production') {
    throw new Error('Você não pode rodar testes em modo de produção');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('Você não pode rodar testes sem um banco de dados de teste');
}

describe("server/integration/crudJogadores.test.ts", () => {
    const jogadorPost = {
        nome_completo: "Jogador da Silva",
        telefone: "12345678911",
        cpf: "12345678911",
        email: "asd@gmail.com",
        responsavel: {
            nome_completo: "Responsavel da Silva",
            telefone: "12345678911",
            cpf: "12345678911",
            email: "asd1@gmail.com",
        }
    }

    describe("Fluxo Principal", () => {
        let jogador: JogadorModel;

        it("deve criar um jogador com responsável", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send(jogadorPost);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('responsavel');

            jogador = response.body
        });

        it("deve criar um jogador sem responsável", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send({
                nome_completo: "Jogador da Silva Orfão",
                telefone: "12345678912",
                cpf: "12345678912",
                email: "orfaodasilva@gmail.com",
            });

            expect(response.status).toBe(201);
        });

        it("deve buscar um jogador específico com base no id", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?id=${jogador.id}`);

            expect(response.body[0].id).toBe(jogador.id);

            expect(response.status).toBe(200);
        });

        it("deve buscar um jogador específico com base no nome", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?nome_completo=${jogador.nome_completo}`);

            expect(response.body[0].nome_completo).toBe(jogador.nome_completo);

            expect(response.status).toBe(200);
        });

        it("deve buscar um jogador específico com base no nome do responsável", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?nome_completo=${jogador.responsavel.nome_completo}`);

            expect(response.body[0].nome_completo).toBe(jogador.nome_completo);

            expect(response.status).toBe(200);
        });

        it("deve buscar um jogador específico com base no cpf", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?cpf=${jogador.cpf}`);

            expect(response.body[0].cpf).toBe(jogador.cpf);

            expect(response.status).toBe(200);
        });

        it("deve buscar um jogador específico com base no cpf do responsável", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?cpf=${jogador.responsavel.cpf}`);

            expect(response.body[0].cpf).toBe(jogador.cpf);

            expect(response.status).toBe(200);
        });

        it("deve buscar um jogador específico com base no nome do jogador e no telefone do responsável", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?nome_completo=${jogador.nome_completo}&telefone=${jogador.responsavel.telefone}`);

            expect(response.body[0].nome_completo).toBe(jogador.nome_completo);
            expect(response.body[0].responsavel.telefone).toBe(jogador.responsavel.telefone);

            expect(response.status).toBe(200);
        });

        it("deve buscar um jogador específico com base no email", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?email=${jogador.email}`);

            expect(response.body[0].email).toBe(jogador.email);

            expect(response.status).toBe(200);
        });

        it("deve buscar um jogador específico com base no telefone", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?telefone=${jogador.telefone}`);

            expect(response.body[0].telefone).toBe(jogador.telefone);

            expect(response.status).toBe(200);
        });

        it("deve ser possível buscar um jogador com base em mais de um parâmetro", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?nome_completo=${jogador.nome_completo}&cpf=${jogador.cpf}`);

            expect(response.body[0].nome_completo).toBe(jogador.nome_completo);
            expect(response.body[0].cpf).toBe(jogador.cpf);

            expect(response.status).toBe(200);
        });

        it("deve retornar 404 quando não encontrar um jogador", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_JOGADORES}?id=0`);

            expect(response.status).toBe(404);
        });

        it.skip("deve atualizar um jogador", async () => {
            const response = await request(process.env.API_URL).put(`${process.env.ROUTE_JOGADORES}/${jogador.id}`).send({
                ...jogador,
                nome_completo: "Jogador da Silva Atualizado",
            });

            expect(response.status).toBe(200);

            expect(response.body.nome_completo).toBe("Jogador da Silva Atualizado");
        });

        it.skip("deve deletar um jogador", async () => {
            const response = await request(process.env.API_URL).delete(`${process.env.ROUTE_JOGADORES}/${jogador.id}`);

            expect(response.status).toBe(200);
        });

    })

    describe("Fluxos Alternativos", () => {
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

