import { ResponsavelType } from "@lib/types/responsavelType";
import sequelize from "@server/database/connection";
import JogadorModel from "@server/models/jogadorModel";
import ResponsavelModel from "@server/models/responsavelModel";
import { Op } from "sequelize";

class ResponsavelRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<ResponsavelModel[]> {
        const filtros = {
            responsavel: camposParaBusca?.map(campoParaBusca => ({ [campoParaBusca.campo]: campoParaBusca.valor })),
            jogador: camposParaBusca?.map(campoParaBusca => ({ [`$jogador.${campoParaBusca.campo}$`]: campoParaBusca.valor }))
        }

        const where = {
            [Op.or]: {
                [Op.and]: filtros.responsavel,
                [Op.or]: filtros.jogador
            }
        }

        if (!camposParaBusca?.length) return ResponsavelModel.findAll();
        
        return ResponsavelModel.findAll({
            where
        });
    }

    async create(body: Omit<ResponsavelType, "id">): Promise<ResponsavelModel> {
        const resultado = await sequelize.transaction(async (t) => {
            const responsavel = await ResponsavelModel.create(body, {
                transaction: t,
                include: [JogadorModel.unscoped()]
            });

            return responsavel;
        });

        return resultado;
    }
}

export default new ResponsavelRepository()