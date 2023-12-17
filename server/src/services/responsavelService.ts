import NotImplementedError from "@lib/errors/notImplementedError";
import responsavelSchema from "@lib/types/responsavelType";
import validarCamposParaBusca from "@lib/utils/services/validarCamposParaBusca";
import ResponsavelModel from "@server/models/responsavelModel";
import responsavelRepository from "@server/repositories/responsavelRepository";

const camposPermitidosParaBusca = ["id", "nome_completo", "email", "telefone", "cpf", "data_nascimento", "fk_jogador_id"]

class ResponsavelService {
    async get(query: Record<string, unknown>): Promise<ResponsavelModel[] | null> {
        const resultado = await responsavelRepository.findAll(validarCamposParaBusca(query, camposPermitidosParaBusca))
        
                
        return resultado
    }
    
    async create(body: unknown): Promise<ResponsavelModel> {
        const post = responsavelSchema.omit({ id: true }).parse(body);

        const resultado = await ResponsavelModel.create(post);

        return resultado;
    }

    async update(id: string, body: any) {
        throw new NotImplementedError("ResponsavelService.update()")
    }

    async delete(id: string) {
        throw new NotImplementedError("ResponsavelService.delete()")
    }
}

export default new ResponsavelService();