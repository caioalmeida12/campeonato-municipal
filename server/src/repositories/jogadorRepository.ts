import JogadorModel from "@server/models/jogadorModel";
import ResponsavelModel from "@server/models/responsavelModel";
import { Op } from "sequelize";

class JogadorRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<JogadorModel[]> {
        const where = {
            [Op.or]: {
                [Op.and]: camposParaBusca?.map(campoParaBusca => ({ [campoParaBusca.campo]: campoParaBusca.valor })),
                "$responsavel.nome_completo$": { [Op.like]: `%${camposParaBusca?.find(campoParaBusca => campoParaBusca.campo === "nome_completo")?.valor}%`},
            }
        }

        if (!camposParaBusca?.length) return JogadorModel.findAll();
        
        return JogadorModel.findAll({
            where: {
                [Op.or]: {
                    ...where
                }
            },
            include: [ResponsavelModel]
        });
    }

    async create(body: any): Promise<JogadorModel> {
        return JogadorModel.create(body);
    }

    async update(id: string, body: any): Promise<JogadorModel | undefined> {
        const jogador = await JogadorModel.findByPk(id);

        return jogador?.update(body);
    }

    async delete(id: string): Promise<void | undefined> {
        const jogador = await JogadorModel.findByPk(id);

        return jogador?.destroy();
    }
}

export default new JogadorRepository()