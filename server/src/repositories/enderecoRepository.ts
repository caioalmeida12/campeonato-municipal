import { EnderecoType } from "@lib/types/enderecoType";
import sequelize from "@server/database/connection";
import EnderecoModel from "@server/models/enderecoModel";
import JogadorModel from "@server/models/jogadorModel";
import { Op } from "sequelize";

class EnderecoRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<EnderecoModel[]> {
        const filtros = {
            endereco: camposParaBusca?.map(campoParaBusca => ({ [campoParaBusca.campo]: campoParaBusca.valor })),
        }

        const where = {
            [Op.and]: filtros.endereco,
        }

        if (!camposParaBusca?.length) return EnderecoModel.findAll({ paranoid: false});

        return EnderecoModel.findAll({
            where
        });
    }

    async create(body: Omit<EnderecoType, "fk_jogador_id">): Promise<EnderecoModel> {
        const resultado = await sequelize.transaction(async (t) => {
            const endereco = await EnderecoModel.create(body, {
                transaction: t,
                include: [JogadorModel.unscoped()]
            });

            return endereco;
        });

        return resultado;
    }

    async update(id: string, body: Omit<EnderecoType, "fk_jogador_id">): Promise<EnderecoModel | undefined> {
        const endereco = await EnderecoModel.findByPk(id);

        return endereco?.update(body);
    }

    async delete(id: string): Promise<void | undefined> {
        const endereco = await EnderecoModel.findByPk(id);

        return endereco?.destroy();
    }
}

export default new EnderecoRepository()