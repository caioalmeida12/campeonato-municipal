import { SequelizeValidationError } from "@lib/errors/customSequelizeValidationError"
import NotImplementedError from "@lib/errors/notImplementedError"
import jogadorSchema from "@lib/types/jogadorType"
import JogadorModel from "@server/models/jogadorModel"
import jogadorRepository from "@server/repositories/jogadorRepository"
import { Sequelize, ValidationError } from "sequelize"

const camposPermitidosParaBusca = ["id", "nome_completo", "email", "telefone", "cpf", "data_nascimento", "posicao"]

class JogadorService {
    async get(query: Record<string, unknown>): Promise<JogadorModel[] | null> {
        const camposValidadosParaBusca = camposPermitidosParaBusca.filter(campo => query[campo])
        
        const camposEValoresValidadosParaBusca = camposValidadosParaBusca.map(campo => { return { campo, valor: query[campo] } })
        
        const resultado = await jogadorRepository.findAll(camposEValoresValidadosParaBusca)
                
        return resultado
    }

    async create(body: any) {
        console.table(body)

        const post = jogadorSchema.omit({ id: true }).parse(body)

        const resultado = await jogadorRepository.create(post)

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