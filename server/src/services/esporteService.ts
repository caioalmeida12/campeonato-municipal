import ZodError from "@lib/errors/customZodError"
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

        console.table(post)
        
        if (post.maximo_jogadores_por_time < post.maximo_jogadores_titulares) throw new ZodError(
            "O número máximo de jogadores por time não pode ser menor que o número máximo de jogadores titulares",
            [{ path: ["maximo_jogadores_por_time"], message: "O número máximo de jogadores por time não pode ser menor que o número máximo de jogadores titulares", code: "invalid", validation: "min" }]
        )
        
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