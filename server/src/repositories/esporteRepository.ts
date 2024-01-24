import { EsporteType } from "@lib/types/esporteType";
import sequelize from "@server/database/connection";
import esporteModel from "@server/models/esporteModel";
import { Op } from "sequelize";

class EsporteRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<esporteModel[]> {
        const filtros = {
            esporte: camposParaBusca?.map(campoParaBusca => ({ [campoParaBusca.campo]: campoParaBusca.valor })),
        }

        const where = {
            [Op.and]: filtros.esporte,
        }

        if (!camposParaBusca?.length) return esporteModel.findAll();

        return esporteModel.findAll({
            where
        });
    }

    async create(body: Omit<EsporteType, "id">): Promise<esporteModel> {
        const resultado = await sequelize.transaction(async (t) => {
            const esporte = await esporteModel.create(body, {
                transaction: t,
            });

            return esporte;
        });

        return resultado;
    }

    async update(id: string, body: Omit<EsporteType, "id">): Promise<esporteModel | undefined> {
        const esporte = await esporteModel.findByPk(id);

        return esporte?.update(body);
    }

    async delete(id: string): Promise<void | undefined> {
        const esporte = await esporteModel.findByPk(id);

        return esporte?.destroy();
    }
}

export default new EsporteRepository()