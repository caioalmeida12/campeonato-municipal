import request from 'supertest';

import env from '@lib/utils/dotenv';
import EnvVariableNotLoadedError from '@lib/errors/envVariableNotLoadedError';
import JogadorModel from '@server/models/jogadorModel';
import DocumentoModel from '@server/models/documentoModel';

if (!env) throw new EnvVariableNotLoadedError("crudDocumentos.test.ts")

if (process.env.NODE_ENV == 'production') {
    throw new Error('Você não pode rodar testes em modo de produção');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('Você não pode rodar testes sem um banco de dados de teste');
}

describe("server/integration/crudDocumentos.test.ts", () => {
    const jogadorPost = {
        nome_completo: "Jogador Teste de Documento",
        email: "asdsaasdd@gmail.com",
        cpf: "12344678601",
        telefone: "12345878901",
    }

    const documentoPost = {
        fk_jogador_id: "",
        tipo: "RG",
        data: "path/to/your/file",
        validade: "2022-12-12"
    }

    describe("Fluxo Principal", () => {
        let jogador: JogadorModel;
        let documento: DocumentoModel;

        it("Deve criar um jogador", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send(jogadorPost);

            expect(response.status).toBe(201);

            jogador = response.body;
            documentoPost.fk_jogador_id = jogador.id;
        })

        it("Deve criar um documento", async () => {
            try {
                const response = await request(process.env.API_URL)
                    .post(process.env.ROUTE_DOCUMENTOS!)
                    .attach('data', './.gitignore')
                    .field('fk_jogador_id', documentoPost.fk_jogador_id)
                    .field('tipo', documentoPost.tipo)
                    .field('validade', documentoPost.validade)

                expect(response.status).toBe(201);

                documento = response.body;
            } catch (error) {
                console.error(error);
            }
        })
        // it("Deve buscar um documento", async () => {
        //     const response = await request(process.env.API_URL).get(process.env.ROUTE_DOCUMENTOS!).query({ fk_jogador_id: jogador.id });

        //     expect(response.status).toBe(200);
        //     expect(response.body).toEqual([documento]);
        // })

        // it("Deve atualizar um documento", async () => {
        //     const response = await request(process.env.API_URL).put(`${process.env.ROUTE_DOCUMENTOS!}/${jogador.id}`).send({ validade: "2023-12-12" });

        //     expect(response.status).toBe(200);
        //     expect(response.body).toEqual({ ...documento, validade: "2023-12-12" });
        // })

        // it("Deve deletar um documento", async () => {
        //     const response = await request(process.env.API_URL).delete(`${process.env.ROUTE_DOCUMENTOS!}/${jogador.id}`);

        //     expect(response.status).toBe(200);
        //     expect(response.body).toEqual({ ...documento, validade: "2023-12-12" });
        // })
    })

    describe("Fluxo Alternativo", () => {

    })
})