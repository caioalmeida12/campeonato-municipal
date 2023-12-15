import ResponsavelModel from "@server/models/responsavelModel";
import { Op } from "sequelize";

class ResponsavelRepository {
    async create(responsavel: ResponsavelModel) {
        return await ResponsavelModel.create(responsavel);
    }
    
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<ResponsavelModel[]> {
        const where = { [Op.and]: [{}] }

        camposParaBusca?.map(campoParaBusca => where[Op.and].push({ [campoParaBusca.campo]: campoParaBusca.valor }))

        return ResponsavelModel.findAll({ where });
    }
}

export default new ResponsavelRepository()