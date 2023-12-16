import NotImplementedError from "@lib/errors/notImplementedError"
import jogadorSchema from "@lib/types/jogadorType"
import responsavelSchema from "@lib/types/responsavelType"
import validarCamposParaBusca from "@lib/utils/services/validarCamposParaBusca"
import sequelize from "@server/database/connection"
import JogadorModel from "@server/models/jogadorModel"
import ResponsavelModel from "@server/models/responsavelModel"
import jogadorRepository from "@server/repositories/jogadorRepository"

const camposPermitidosParaBusca = ["id", "nome_completo", "email", "telefone", "cpf", "data_nascimento", "posicao"]

class JogadorService {
    async get(query: Record<string, unknown>): Promise<JogadorModel[] | null> {
        console.log(validarCamposParaBusca(query, camposPermitidosParaBusca))

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

    async update(id: string, body: any) {
        throw new NotImplementedError("JogadorService.update()")
    }

    async delete(id: string) {
        throw new NotImplementedError("JogadorService.delete()")
    }
}

export default new JogadorService()