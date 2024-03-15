import { PosicaoType } from "@lib/types/posicaoType";
import sequelize from "@server/database/connection";
import PosicaoModel from "@server/models/posicaoModel";
import { Op } from "sequelize";

class PosicaoRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<PosicaoModel[]> {
        const filtros = {
            posicao: camposParaBusca?.map(campoParaBusca => ({ [campoParaBusca.campo]: campoParaBusca.valor })),
        }

        const where = {
            [Op.and]: filtros.posicao,
        }

        if (!camposParaBusca?.length) return PosicaoModel.findAll({ paranoid: false});

        return PosicaoModel.findAll({
            where
        });
    }

    async create(body: Omit<PosicaoType, "id">): Promise<PosicaoModel> {
        const resultado = await sequelize.transaction(async (t) => {
            const posicao = await PosicaoModel.create(body, {
                transaction: t,
                include: {
                    all: true,
                }
            });

            return posicao;
        });

        return resultado;
    }

    async update(id: string, body: Omit<PosicaoType, "fk_esporte_id">): Promise<PosicaoModel | undefined> {
        const posicao = await PosicaoModel.findByPk(id);

        return posicao?.update(body);
    }

    async delete(id: string): Promise<void | undefined> {
        const posicao = await PosicaoModel.findByPk(id);

        return posicao?.destroy();
    }
}

export default new PosicaoRepository();