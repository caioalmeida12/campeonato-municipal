import NotImplementedError from "@lib/errors/notImplementedError"
import fichaTecnicaSchema from "@lib/types/fichaTecnicaType"
import validarCamposParaBusca from "@lib/utils/services/validarCamposParaBusca"
import FichaTecnicaModel from "@server/models/fichaTecnicaModel"
import fichaTecnicaRepository from "@server/repositories/fichaTecnicaRepository"

const camposPermitidosParaBusca = ["fk_jogador_id", "fk_posicao_id", "fk_time_id", "altura", "peso", "membro_inferior_dominante", "membro_superior_dominante", "experiencia", "is_capitao"]

class FichaTecnicaService {
    async get(query: Record<string, unknown>): Promise<FichaTecnicaModel[] | null> {
        const resultado = await fichaTecnicaRepository.findAll(validarCamposParaBusca(query, camposPermitidosParaBusca))

        return resultado
    }

    async create(body: unknown) {
        const post = fichaTecnicaSchema.parse(body)

        const resultado = await fichaTecnicaRepository.create(post)

        return resultado
    }

    async update(id: string, body: unknown) {
        const put = fichaTecnicaSchema.parse(body)

        const resultado = await fichaTecnicaRepository.update(id, put)

        return resultado
    }

    async delete(id: string) {
        const resultado = await fichaTecnicaRepository.delete(id)

        return resultado
    }
}

export default new FichaTecnicaService()
