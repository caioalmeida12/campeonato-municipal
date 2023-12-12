import JogadorModel from "@server/models/jogadorModel";
import { Op } from "sequelize";

class JogadorRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<JogadorModel[]> {
        const where = { [Op.and]: [{}] }

        camposParaBusca?.map(campoParaBusca => where[Op.and].push({ [campoParaBusca.campo]: campoParaBusca.valor }))

        return JogadorModel.findAll({ where });
    }
}

export default new JogadorRepository()