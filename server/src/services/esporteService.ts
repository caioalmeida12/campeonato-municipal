import ZodError from "@lib/errors/customZodError"
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
        
        if (post.maximo_jogadores_por_time < post.maximo_jogadores_titulares) throw new ZodError(
            "O número máximo de jogadores por time não pode ser menor que o número máximo de jogadores titulares",
            [{ path: ["maximo_jogadores_por_time"], message: "O número máximo de jogadores por time não pode ser menor que o número máximo de jogadores titulares", code: "invalid", validation: "min" }]
        )
        
        const resultado = await esporteRepository.create(post)

        return resultado
    }

    async update(id: string, body: unknown) {
        const post = esporteSchema.parse(body);
        const resultado = await esporteRepository.update(id, post);
        return resultado;
    }

    async delete(id: string) {
        const resultado = await esporteRepository.delete(id);
        return resultado;
    }
}

export default new EsporteService()