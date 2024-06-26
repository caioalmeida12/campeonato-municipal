import { JogadorType } from "@lib/types/jogadorType";
import sequelize from "@server/database/connection";
import JogadorModel from "@server/models/jogadorModel";
import { Op } from "sequelize";

class JogadorRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<JogadorModel[]> {
        const filtros = {
            jogador: camposParaBusca?.map(campoParaBusca => ({ [campoParaBusca.campo]: campoParaBusca.valor })),
            responsavel: camposParaBusca?.map(campoParaBusca => ({ [`$responsavel.${campoParaBusca.campo}$`]: campoParaBusca.valor }))
        }

        const where = {
            [Op.or]: {
                [Op.and]: filtros.jogador,
                [Op.or]: filtros.responsavel
            }
        }

        if (!camposParaBusca?.length) return JogadorModel.findAll();
        
        return JogadorModel.findAll({
            where
        });
    }

    async create(body: Omit<JogadorType, "id">): Promise<JogadorModel> {
        const resultado = await sequelize.transaction(async (t) => {
            const jogador = await JogadorModel.create(body, {
                transaction: t,
                include: {
                    all: true,
                }
            });

            return jogador;
        });

        return resultado;
    }

    async update(id: string, body: Omit<JogadorType, "id">): Promise<JogadorModel | undefined> {
        const jogador = await JogadorModel.findByPk(id);

        return jogador?.update(body);
    }

    async delete(id: string): Promise<void | undefined> {
        const jogador = await JogadorModel.findByPk(id);

        return jogador?.destroy();
    }
}

export default new JogadorRepository()