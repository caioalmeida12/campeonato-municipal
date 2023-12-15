import validarCamposParaBusca from "@lib/utils/services/validarCamposParaBusca";
import ResponsavelModel from "@server/models/responsavelModel";
import responsavelRepository from "@server/repositories/responsavelRepository";

const camposPermitidosParaBusca = ["id", "nome_completo", "email", "telefone", "cpf", "data_nascimento", "fk_jogador_id"]

class ResponsavelService {
    async get(query: Record<string, unknown>): Promise<ResponsavelModel[] | null> {
        const resultado = await responsavelRepository.findAll(validarCamposParaBusca(query, camposPermitidosParaBusca))
                
        return resultado
    }
    
    public async create(responsavel: ResponsavelModel): Promise<ResponsavelModel> {
        return await ResponsavelModel.create(responsavel);
    }
}

export default new ResponsavelService();