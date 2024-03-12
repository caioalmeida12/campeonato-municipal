import request from 'supertest';

import env from '@lib/utils/dotenv';
import EnvVariableNotLoadedError from '@lib/errors/envVariableNotLoadedError';
import FichaTecnicaModel from '@server/models/fichaTecnicaModel';
import JogadorModel from '@server/models/jogadorModel';
import { FichaTecnicaType } from '@lib/types/fichaTecnicaType';
import EsporteModel from '@server/models/esporteModel';
import PosicaoModel from '@server/models/posicaoModel';
import TimeModel from '@server/models/timeModel';

if (!env) throw new EnvVariableNotLoadedError("crudJogadores.test.ts")

if (process.env.NODE_ENV == 'production') {
    throw new Error('Você não pode rodar testes em modo de produção');
}

if (!process.env.DB_DATABASE?.includes('test')) {
    throw new Error('Você não pode rodar testes sem um banco de dados de teste');
}

describe("server/integration/crudFichaTecnica.test.ts", () => {
    const jogadorPost = {
        nome_completo: "Jogador Teste",
        email: "asdsad@gmail.com",
        cpf: "12345678901",
        telefone: "12345678901",
    }

    const esportePost = {
        nome: "Futebol três",
        maximo_jogadores_por_time: 11,
        maximo_jogadores_titulares: 11
    }

    const posicaoPost = {
        fk_esporte_id: "",
        nome: "Goleiro de futebol três",
    }

    const timePost = {
        nome: "Time Teste",
        localidade: "Localidade Teste",
        responsavel: "Responsável Teste",
        telefone: "12345678901",
        email: "timetrês@teste.com",
        escudo: "http://linkparaescudo.com",
        fk_esporte_id: ""
    };

    const fichaTecnicaPost: FichaTecnicaType = {
        fk_jogador_id: "",
        fk_posicao_id: "",
        fk_time_id: "",
        altura: 180,
        peso: 80,
        membro_inferior_dominante: 'DIR',
        membro_superior_dominante: 'DIR',
        experiencia: 'AMADOR',
        is_capitao: false,
    }

    describe("Fluxo Principal", () => {
        let jogador: JogadorModel;
        let fichaTecnica: FichaTecnicaModel;
        let esporte: EsporteModel;
        let posicao: PosicaoModel;
        let time: TimeModel;

        it("deve criar um esporte", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_ESPORTES!).send(esportePost);

            expect(response.status).toBe(201);

            esporte = response.body
            posicaoPost.fk_esporte_id = esporte.id
            timePost.fk_esporte_id = esporte.id
        });

        it("deve criar uma posição", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_POSICOES!).send(posicaoPost);

            expect(response.status).toBe(201);

            posicao = response.body
            fichaTecnicaPost.fk_posicao_id = posicao.id
        });

        it("deve criar um time", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_TIMES!).send(timePost);

            expect(response.status).toBe(201);

            time = response.body
            fichaTecnicaPost.fk_time_id = time.id
        });

        it("deve criar uma ficha técnica", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_FICHAS_TECNICAS!).send(fichaTecnicaPost);

            expect(response.status).toBe(201);
            expect(response.body.fk_jogador_id).toBe(jogador.id);
            expect(response.body.fk_posicao_id).toBe(posicao.id);
            expect(response.body.fk_time_id).toBe(time.id);

            fichaTecnica = response.body
        });

        it("deve buscar uma ficha técnica específica com base no id", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_FICHAS_TECNICAS!}?id=${fichaTecnica.id}`);

            expect(response.body[0].id).toBe(fichaTecnica.id);

            expect(response.status).toBe(200);
        });

        it("deve buscar todas as fichas técnicas", async () => {
            const response = await request(process.env.API_URL).get(process.env.ROUTE_FICHAS_TECNICAS!);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        it.skip("deve atualizar uma ficha técnica", async () => {
            const updatedFichaTecnica = { ...fichaTecnicaPost, altura: 185 };
            const response = await request(process.env.API_URL).put(`${process.env.ROUTE_FICHAS_TECNICAS!}/${fichaTecnica.id}`).send(updatedFichaTecnica);

            expect(response.status).toBe(200);
            expect(response.body.altura).toBe(185);
        });

        it.skip("deve deletar uma ficha técnica", async () => {
            const response = await request(process.env.API_URL).delete(`${process.env.ROUTE_FICHAS_TECNICAS!}/${fichaTecnica.id}`);

            expect(response.status).toBe(200);
        });

    })

    describe("Fluxos Alternativos", () => {
        it("deve retornar 404 quando não encontrar uma ficha técnica", async () => {
            const response = await request(process.env.API_URL).get(`${process.env.ROUTE_FICHAS_TECNICAS!}?id=1234567890`);

            expect(response.status).toBe(404);
        });

        it("deve retornar 400 quando não enviar um campo (ex: altura)", async () => {
            const updatedFichaTecnica = { ...fichaTecnicaPost, altura: undefined };
            const response = await request(process.env.API_URL).post(process.env.ROUTE_FICHAS_TECNICAS!).send(updatedFichaTecnica);

            expect(response.status).toBe(400);
        });
    });
});