import JogadorModel from "@server/models/jogadorModel"
import jogadorRepository from "@server/repositories/jogadorRepository"

const camposPermitidosParaBusca = ["id", "nome_completo", "email", "telefone", "cpf", "data_nascimento", "posicao"]

class JogadorService {
    async get(query: Record<string, unknown>): Promise<JogadorModel[] | null> {
        const camposValidadosParaBusca = camposPermitidosParaBusca.filter(campo => query[campo])

        const camposEValoresValidadosParaBusca = camposValidadosParaBusca.map(campo => { return { campo, valor: query[campo] } })

        const resultado = await jogadorRepository.findAll(camposEValoresValidadosParaBusca)

        if (!resultado.length && camposEValoresValidadosParaBusca.length) return null

        return resultado
    }
}

export default new JogadorService()