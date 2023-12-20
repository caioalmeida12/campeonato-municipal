import NotImplementedError from "@lib/errors/notImplementedError"
import jogadorSchema from "@lib/types/jogadorType"
import validarCamposParaBusca from "@lib/utils/services/validarCamposParaBusca"
import sequelize from "@server/database/connection"
import JogadorModel from "@server/models/jogadorModel"
import ResponsavelModel from "@server/models/responsavelModel"
import jogadorRepository from "@server/repositories/jogadorRepository"

const camposPermitidosParaBusca = ["id", "nome_completo", "email", "telefone", "cpf", "data_nascimento", "posicao"]

class JogadorService {
    async get(query: Record<string, unknown>): Promise<JogadorModel[] | null> {
        const resultado = await jogadorRepository.findAll(validarCamposParaBusca(query, camposPermitidosParaBusca))

        return resultado
    }

    async create(body: unknown) {
        const post = jogadorSchema.omit({ id: true }).parse(body)

        const resultado = sequelize.transaction(async (t) => {
            const jogador = await JogadorModel.create(post, {
                include: [ResponsavelModel],
                transaction: t
            });

            return jogador;
        });

        return resultado
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(id: string, body: unknown) {
        throw new NotImplementedError("JogadorService.update()")
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async delete(id: string) {
        throw new NotImplementedError("JogadorService.delete()")
    }
}

export default new JogadorService()