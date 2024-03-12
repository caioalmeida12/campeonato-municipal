import timeSchema from "@lib/types/timeType"
import validarCamposParaBusca from "@lib/utils/services/validarCamposParaBusca"
import TimeModel from "@server/models/timeModel"
import timeRepository from "@server/repositories/timeRepository"

const camposPermitidosParaBusca = ["id", "nome", "localidade", "responsavel", "telefone", "email", "escudo", "fk_esporte_id"]

class TimeService {
    async get(query: Record<string, unknown>): Promise<TimeModel[] | null> {
        const resultado = await timeRepository.findAll(validarCamposParaBusca(query, camposPermitidosParaBusca))

        return resultado
    }

    async create(body: unknown) {
        const post = timeSchema.omit({ id: true }).parse(body)
        
        const resultado = await timeRepository.create(post)

        return resultado
    }

    async update(id: string, body: unknown) {
        const post = timeSchema.parse(body)

        const resultado = await timeRepository.update(id, post)

        return resultado
    }

    async delete(id: string) {
        const resultado = await timeRepository.delete(id)

        return resultado
    }
}

export default new TimeService()