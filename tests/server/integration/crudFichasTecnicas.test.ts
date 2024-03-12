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

            timePost.fk_esporte_id = esporte.id
            posicaoPost.fk_esporte_id = esporte.id
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

        it("deve criar um jogador", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_JOGADORES!).send(jogadorPost);

            expect(response.status).toBe(201);

            jogador = response.body
            fichaTecnicaPost.fk_jogador_id = jogador.id
        });

        it("deve criar uma ficha técnica", async () => {
            const response = await request(process.env.API_URL).post(process.env.ROUTE_FICHAS_TECNICAS!).send(fichaTecnicaPost);

            expect(response.status).toBe(201);

            fichaTecnica = response.body
        });
    })

    describe("Fluxos Alternativos", () => {

    });
});