import EnderecoModel from '@server/models/enderecoModel';
import request from 'supertest';

import env from '@lib/utils/dotenv';
import EnvVariableNotLoadedError from '@lib/errors/envVariableNotLoadedError';

if (!env) throw new EnvVariableNotLoadedError("crudJogadores.test.ts")

if (process.env.NODE_ENV == 'production') {
    throw new Error('Você não pode rodar testes em modo de produção');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('Você não pode rodar testes sem um banco de dados de teste');
}

describe("server/integration/crudEnderecos.test.ts", () => {
    const enderecoPost = {
        logradouro: "Rua da Silva",
        numero: "123",
        bairro: "Bairro da Silva",
        cidade: "Cidade da Silva",
        cep: "12345678",
        estado: "Estado da Silva",
        pais: "Pais da Silva",
        jogador: {
            nome_completo: "Jogador do Endereço",
            telefone: "9999999999999",
            cpf: "99999999999",
            email: "endereco@gmail.com",
        }
    }

    describe("Fluxo Principal", () => {
        let endereco: EnderecoModel;

        it("deve criar um endereço com jogador", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_ENDERECOS!).send(enderecoPost);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('logradouro');
            expect(response.body).toHaveProperty('jogador');

            endereco = response.body
        });

        it("deve buscar um endereço específico com base no id", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_ENDERECOS!}?fk_jogador_id=${endereco.fk_jogador_id}`);

            expect(response.body[0].fk_jogador_id).toBe(endereco.fk_jogador_id);

            expect(response.status).toBe(200);
        });

        it("deve buscar um endereço específico com base no logradouro", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_ENDERECOS!}?logradouro=${endereco.logradouro}`);

            expect(response.body[0].logradouro).toBe(endereco.logradouro);

            expect(response.status).toBe(200);
        });

        it("deve buscar um endereço específico com base na cidade", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_ENDERECOS!}?cidade=${endereco.cidade}`);

            expect(response.body[0].cidade).toBe(endereco.cidade);

            expect(response.status).toBe(200);
        });

        it("deve buscar um endereço específico com base no cep", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_ENDERECOS!}?cep=${endereco.cep}`);

            expect(response.body[0].cep).toBe(endereco.cep);

            expect(response.status).toBe(200);
        });

        it("deve retornar 404 quando não encontrar um endereço", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_ENDERECOS!}?fk_jogador_id=0`);

            expect(response.status).toBe(404);
        });

        it.skip("deve atualizar um endereço", async () => {
            const response = await request(process.env.API_URL).put(`${process.env.ROUTE_ENDERECOS!}/${endereco.fk_jogador_id}`).send({
                ...endereco,
                logradouro: "Rua da Silva Atualizada",
            });

            expect(response.status).toBe(200);

            expect(response.body.logradouro).toBe("Rua da Silva Atualizada");
        });

        it.skip("deve deletar um endereço", async () => {
            const response = await request(process.env.API_URL).delete(`${process.env.ROUTE_ENDERECOS!}/${endereco.fk_jogador_id}`);

            it("deve criar um endereço sem jogador", async () => {
                const response2 = await request(process.env.API_URL).post(process.env.ROUTE_ENDERECOS!).send({
                    ...enderecoPost,
                    fk_jogador_id: response.body.id,
                });

                expect(response2.status).toBe(201);

                expect(response2.body).toHaveProperty('logradouro');
            });

            expect(response.status).toBe(200);
            
        });
    })

    describe("Fluxos Alternativos", () => {
        it("deve retornar 400 quando não enviar um campo (ex: logradouro)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_ENDERECOS!).send({
                ...enderecoPost,
                bairro: undefined,
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });

        it("deve retornar 400 quando enviar um campo inválido (ex: cep com dígitos a mais)", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_ENDERECOS!).send({
                ...enderecoPost,
                cep: "123456789",
            });

            expect(response.status).toBe(Number(process.env.SEQUELIZE_VALIDATION_ERROR));
        });
    })
});