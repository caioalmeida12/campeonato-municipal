import isSetupOK from '@server/core/setup';
import sequelize from '@server/database/connection';
import ResponsavelModel from '@server/models/responsavelModel';

import request from 'supertest'

if (process.env.NODE_ENV == 'production') {
    throw new Error('Você não pode rodar testes em modo de produção');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('Você não pode rodar testes sem um banco de dados de teste');
}

describe("server/integration/crudResponsaveis.test.ts", () => {
    const responsavelPost = {
        nome_completo: "Teste da Silva",
        telefone: "12345678911",
        cpf: "12345678911",
        email: "asd@gmail.com",
    }

    beforeAll(async () => {
        isSetupOK;
        await sequelize.sync();
        await sequelize.query("SELECT 1+1")

        await ResponsavelModel.destroy({
            truncate: true,
            force: true,
            cascade: true,
        });
    });

    describe("GET", () => {
        let responsavel: ResponsavelModel;

        beforeEach(async () => {
            responsavel = await ResponsavelModel.create(responsavelPost)
        })

        afterEach(async () => {
            await ResponsavelModel.destroy({
                truncate: true,
                force: true,
            });
        })

        it("deve buscar todos os responsaveis", async () => {
            const response = await request(process.env.API_URL).get(String(process.env.ROUTE_RESPONSAVEIS));

            expect(response.status).toBe(200);
        })

        it("deve buscar um responsavel pelo id", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?id=${responsavel.id}`);

            expect(response.body[0].id).toBe(responsavel.id);

            expect(response.status).toBe(200);
        })

        it("deve buscar um responsavel pelo nome", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?nome_completo=${responsavel.nome_completo}`);

            expect(response.body[0].nome_completo).toBe(responsavel.nome_completo);

            expect(response.status).toBe(200);
        })

        it("deve buscar um responsavel pelo cpf", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?cpf=${responsavel.cpf}`);

            expect(response.body[0].cpf).toBe(responsavel.cpf);

            expect(response.status).toBe(200);
        })

        it("deve buscar um responsavel pelo email", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?email=${responsavel.email}`);

            expect(response.body[0].email).toBe(responsavel.email);

            expect(response.status).toBe(200);
        })

        it("deve buscar um responsavel pelo telefone", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?telefone=${responsavel.telefone}`);

            expect(response.body[0].telefone).toBe(responsavel.telefone);

            expect(response.status).toBe(200);
        })

        it("deve buscar um responsavel pelo id do jogador", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?fk_jogador_id=${responsavel.fk_jogador_id}`);

            expect(response.body[0].fk_jogador_id).toBe(responsavel.fk_jogador_id);

            expect(response.status).toBe(200);
        })

        // it("deve buscar um responsavel pelo nome do jogador", async () => {
        //     const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?nome_completo=${}`);

        //     expect(response.body[0].fk_jogador_nome_completo).toBe(responsavel);

        //     expect(response.status).toBe(200);
        // })

        it("deve retornar 404 se não encontrar o responsavel", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_RESPONSAVEIS}?id=999999`);

            expect(response.status).toBe(404);
        })
    });

    // describe("POST", () => {
    //     afterEach(async () => {
    //         await ResponsavelModel.destroy({
    //             truncate: true,
    //             force: true,
    //         });
    //     })

    //     // Adapt the rest of the tests similarly, replacing Jogador with Responsavel
    // })
})