import NotImplementedError from "@lib/errors/notImplementedError"
import esporteSchema from "@lib/types/esporteType"
import validarCamposParaBusca from "@lib/utils/services/validarCamposParaBusca"
import EsporteModel from "@server/models/esporteModel"
import esporteRepository from "@server/repositories/esporteRepository"

const camposPermitidosParaBusca = ["id", "nome", "maximo_jogador_por_time", "max_jogadores_titulares"]

class EsporteService {
    async get(query: Record<string, unknown>): Promise<EsporteModel[] | null> {
        const resultado = await esporteRepository.findAll(validarCamposParaBusca(query, camposPermitidosParaBusca))

        return resultado
    }

    async create(body: unknown) {
        const post = esporteSchema.omit({ id: true }).parse(body)
        
        const resultado = await esporteRepository.create(post)

        return resultado
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(id: string, body: unknown) {
        throw new NotImplementedError("EsporteService.update()")
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async delete(id: string) {
        throw new NotImplementedError("EsporteService.delete()")
    }
}

export default new EsporteService()