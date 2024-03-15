import { FichaTecnicaType } from "@lib/types/fichaTecnicaType";
import sequelize from "@server/database/connection";
import FichaTecnicaModel from "@server/models/fichaTecnicaModel";
import JogadorModel from "@server/models/jogadorModel";
import PosicaoModel from "@server/models/posicaoModel";
import TimeModel from "@server/models/timeModel";
import { Op } from "sequelize";

class FichaTecnicaRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<FichaTecnicaModel[]> {
        const filtros = {
            fichaTecnica: camposParaBusca?.map(campoParaBusca => ({ [campoParaBusca.campo]: campoParaBusca.valor })),
        }

        const where = {
            [Op.and]: filtros.fichaTecnica,
        }

        if (!camposParaBusca?.length) return FichaTecnicaModel.findAll({ paranoid: false});

        return FichaTecnicaModel.findAll({
            where
        });
    }

    async create(body: FichaTecnicaType): Promise<FichaTecnicaModel> {
        const resultado = await sequelize.transaction(async (t) => {
            const fichaTecnica = await FichaTecnicaModel.create(body, {
                transaction: t,
                include: [JogadorModel.unscoped(), PosicaoModel.unscoped(), TimeModel.unscoped()],

            });

            return fichaTecnica;
        });

        return resultado;
    }

    async update(id: string, body: FichaTecnicaType): Promise<FichaTecnicaModel | undefined> {
        const fichaTecnica = await FichaTecnicaModel.findByPk(id);

        return fichaTecnica?.update(body);
    }

    async delete(fk_jogador_id: string): Promise<void | undefined> {
        const fichaTecnica = await FichaTecnicaModel.findOne({ where: { 
            fk_jogador_id
         } });

        return fichaTecnica?.destroy();
    }
}

export default new FichaTecnicaRepository();