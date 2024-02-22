import { FichaTecnicaType } from "@lib/types/fichaTecnicaType";
import sequelize from "@server/database/connection";
import FichaTecnicaModel from "@server/models/fichaTecnicaModel";
import { Op } from "sequelize";

class FichaTecnicaRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<FichaTecnicaModel[]> {
        const filtros = {
            fichaTecnica: camposParaBusca?.map(campoParaBusca => ({ [campoParaBusca.campo]: campoParaBusca.valor })),
        }

        const where = {
            [Op.and]: filtros.fichaTecnica,
        }

        if (!camposParaBusca?.length) return FichaTecnicaModel.findAll();

        return FichaTecnicaModel.findAll({
            where
        });
    }

    async create(body: FichaTecnicaType): Promise<FichaTecnicaModel> {
        const resultado = await sequelize.transaction(async (t) => {
            const fichaTecnica = await FichaTecnicaModel.create(body, {
                transaction: t,
                include: {
                    all: true,
                }
            });

            return fichaTecnica;
        });

        return resultado;
    }

    async update(id: string, body: FichaTecnicaType): Promise<FichaTecnicaModel | undefined> {
        const fichaTecnica = await FichaTecnicaModel.findByPk(id);

        return fichaTecnica?.update(body);
    }

    async delete(id: string): Promise<void | undefined> {
        const fichaTecnica = await FichaTecnicaModel.findByPk(id);

        return fichaTecnica?.destroy();
    }
}

export default new FichaTecnicaRepository();