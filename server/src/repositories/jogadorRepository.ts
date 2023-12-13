import JogadorModel from "@server/models/jogadorModel";
import { Op } from "sequelize";

class JogadorRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<JogadorModel[]> {
        const where = { [Op.and]: [{}] }

        camposParaBusca?.map(campoParaBusca => where[Op.and].push({ [campoParaBusca.campo]: campoParaBusca.valor }))

        return JogadorModel.findAll({ where });
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