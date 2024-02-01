import NotImplementedError from "@lib/errors/notImplementedError"
import enderecoSchema from "@lib/types/enderecoType"
import validarCamposParaBusca from "@lib/utils/services/validarCamposParaBusca"
import EnderecoModel from "@server/models/enderecoModel"
import enderecoRepository from "@server/repositories/enderecoRepository"

const camposPermitidosParaBusca = ["fk_jogador_id", "logradouro", "numero", "bairro", "cidade", "cep", "estado", "pais"]

class EnderecoService {
    async get(query: Record<string, unknown>): Promise<EnderecoModel[] | null> {
        const resultado = await enderecoRepository.findAll(validarCamposParaBusca(query, camposPermitidosParaBusca))

        return resultado
    }

    async create(body: unknown) {
        const post = enderecoSchema.omit({ fk_jogador_id: true }).parse(body)
        
        const resultado = await enderecoRepository.create(post)

        return resultado
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(fk_jogador_id: string, body: unknown) {
        throw new NotImplementedError("EnderecoService.update()")
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async delete(fk_jogador_id: string) {
        throw new NotImplementedError("EnderecoService.delete()")
    }
}

export default new EnderecoService()