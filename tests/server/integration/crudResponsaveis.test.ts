import JogadorModel from '@server/models/jogadorModel';
import request from 'supertest'

import env from '@lib/utils/dotenv';
import EnvVariableNotLoadedError from '@lib/errors/envVariableNotLoadedError';
import ResponsavelModel from '@server/models/responsavelModel';

if (!env) throw new EnvVariableNotLoadedError("crudResponsaveis.test.ts")

if (process.env.NODE_ENV == 'production') {
    throw new Error('Você não pode rodar testes em modo de produção');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('Você não pode rodar testes sem um banco de dados de teste');
}

describe("server/integration/crudResponsaveis.test.ts", () => {
    const responsavelPost = {
        nome_completo: "Responsavel de Souza",
        telefone: "12345678311",
        cpf: "12345678311",
        email: "souza@gmail.com",
        jogador: {
            nome_completo: "Jogador de Souza",
            telefone: "12345678311",
            cpf: "12345678311",
            email: "souza@gmail.com",
        }
    }

    describe("Fluxo principal", () => {
        let responsavel: ResponsavelModel

        it("Deve criar um responsavel com um jogador", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_RESPONSAVEIS!).send(responsavelPost);

            expect(response.status).toBe(201)
            expect(response.body).toHaveProperty('jogador')
            
            responsavel = response.body
        })

        it("Deve retornar um responsavel com um jogador", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?id=${responsavel.id}`);

            expect(response.status).toBe(200)
            expect(response.body[0]).toHaveProperty('jogador')
        })        

        it("deve buscar um responsável específico com base no nome", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?nome_completo=${responsavel.nome_completo}`);

            expect(response.status).toBe(200)
            expect(response.body[0]).toHaveProperty('jogador')
        })

        it("deve buscar um responsável específico com base no nome do jogador", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?nome_completo=${responsavelPost.jogador.nome_completo}`);

            expect(response.status).toBe(200)
            expect(response.body[0]).toHaveProperty('jogador')
        })

        it("deve buscar um responsável específico com base no cpf", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?cpf=${responsavelPost.cpf}`);

            expect(response.status).toBe(200)
            expect(response.body[0]).toHaveProperty('jogador')
        })

        it("deve buscar um responsável específico com base no cpf do jogador", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?cpf=${responsavelPost.jogador.cpf}`);

            expect(response.status).toBe(200)
            expect(response.body[0]).toHaveProperty('jogador')
        })

        it("deve buscar um responsável específico com base no nome do jogador e no telefone do responsável", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?nome_completo=${responsavelPost.jogador.nome_completo}&telefone=${responsavelPost.telefone}`);

            expect(response.status).toBe(200)
            expect(response.body[0]).toHaveProperty('jogador')
        })

        it("deve buscar um responsável específico com base no email", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?email=${responsavelPost.email}`);

            expect(response.status).toBe(200)
            expect(response.body[0]).toHaveProperty('jogador')
        })

        it("deve buscar um responsável específico com base no telefone", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?telefone=${responsavelPost.telefone}`);

            expect(response.status).toBe(200)
            expect(response.body[0]).toHaveProperty('jogador')
        })

        it("deve ser possível buscar um responsável com base em mais de um parâmetro", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?nome_completo=${responsavelPost.nome_completo}&telefone=${responsavelPost.telefone}`);

            expect(response.status).toBe(200)
            expect(response.body[0]).toHaveProperty('jogador')
        })

        it("deve retornar 404 quando não encontrar um responsável", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?nome_completo=naoexiste`);

            expect(response.status).toBe(404)
        })

        it.skip("deve atualizar um responsável", async () => {
        })

        it.skip("deve deletar um responsável", async () => {
        })
    })

    describe("Fluxos alternativos", () => {
        it("deve retornar 400 quando não enviar um campo (ex: nome)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_RESPONSAVEIS!).send({
                ...responsavelPost,
                nome_completo: undefined,
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });

        it("deve retornar 400 quando enviar um campo inválido (ex: telefone com dígitos a mais)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_RESPONSAVEIS!).send({
                ...responsavelPost,
                telefone: "123456789111111",
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });

        it("deve retornar 400 quando enviar um campo inválido (ex: nome com caracteres especiais)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_RESPONSAVEIS!).send({
                ...responsavelPost,
                nome_completo: "Teste da Silva 123",
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });

        it("deve retornar 400 quando enviar um campo inválido (ex: nome sem sobrenome)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_RESPONSAVEIS!).send({
                ...responsavelPost,
                nome_completo: "Teste",
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });

        it("deve retornar 400 quando enviar um campo inválido no responsável (ex: cpf com dígitos a mais)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_RESPONSAVEIS!).send({
                ...responsavelPost,
                jogador: {
                    ...responsavelPost.jogador,
                    cpf: "123456783111",
                }
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });
    })
})
