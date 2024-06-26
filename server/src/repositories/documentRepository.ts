import { DocumentoType } from "@lib/types/documentoType";
import sequelize from "@server/database/connection";
import DocumentoModel from "@server/models/documentoModel";
import { Op } from "sequelize";

class DocumentoRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<DocumentoModel[]> {
        const filtros = {
            documento: camposParaBusca?.map(campoParaBusca => ({ [campoParaBusca.campo]: campoParaBusca.valor })),
        }

        const where = {
            [Op.and]: filtros.documento,
        }

        if (!camposParaBusca?.length) return DocumentoModel.findAll();

        return DocumentoModel.findAll({
            where
        });
    }

    async create(body: DocumentoType): Promise<DocumentoModel> {
        const resultado = await sequelize.transaction(async (t) => {
            const documento = await DocumentoModel.create(body, {
                transaction: t,
            });

            return documento;
        });

        return resultado;
    }

    async update(fk_jogador_id: string, body: DocumentoType): Promise<DocumentoModel | undefined> {
        const documento = await DocumentoModel.findByPk(fk_jogador_id);

        return documento?.update(body);
    }

    async delete(fk_jogador_id: string, tipo: string): Promise<void | undefined> {
        const documento = await DocumentoModel.findOne({
            where: {
                fk_jogador_id,
                tipo
            }
        });

        return documento?.destroy();
    }
}

export default new DocumentoRepository();