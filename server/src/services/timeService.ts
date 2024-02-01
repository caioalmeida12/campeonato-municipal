import NotImplementedError from "@lib/errors/notImplementedError"
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

    async create(body: unknown): Promise<TimeModel> {
        const post = timeSchema.omit({ id: true }).parse(body);

        const resultado = await timeRepository.create(post);

        return resultado;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(id: string, body: unknown) {
        throw new NotImplementedError("TimeService.update()")
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async delete(id: string) {
        throw new NotImplementedError("TimeService.delete()")
    }
}

export default new TimeService()
