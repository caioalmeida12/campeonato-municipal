import { TimeType } from "@lib/types/timeType";
import sequelize from "@server/database/connection";
import TimeModel from "@server/models/timeModel";
import EsporteModel from "@server/models/esporteModel";
import { Op } from "sequelize";

class TimeRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<TimeModel[]> {
        const filtros = {
            time: camposParaBusca?.map(campoParaBusca => ({ [campoParaBusca.campo]: campoParaBusca.valor })),
        }

        const where = {
            [Op.and]: filtros.time,
        }

        if (!camposParaBusca?.length) return TimeModel.findAll({ paranoid: false});

        return TimeModel.findAll({
            where
        });
    }

    async create(body: Omit<TimeType, "id">): Promise<TimeModel> {
        const resultado = await sequelize.transaction(async (t) => {
            const time = await TimeModel.create(body, {
                transaction: t,
                include: [EsporteModel.unscoped()]
            });

            return time;
        });

        return resultado;
    }

    async update(id: string, body: Omit<TimeType, "fk_esporte_id">): Promise<TimeModel | undefined> {
        const time = await TimeModel.findByPk(id);

        return time?.update(body);
    }

    async delete(id: string): Promise<void | undefined> {
        const time = await TimeModel.findByPk(id);

        return time?.destroy();
    }
}

export default new TimeRepository()
