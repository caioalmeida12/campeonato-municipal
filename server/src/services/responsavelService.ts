import jogadorSchema from "@lib/types/jogadorType";
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

        if (post.jogador) jogadorSchema.omit({ id: true }).parse(post.jogador);

        const resultado = await responsavelRepository.create(post);

        return resultado;
    }

    async update(id: string, body: unknown) {
        const put = responsavelSchema.parse(body);

        const resultado = await responsavelRepository.update(id, put);

        return resultado;
    }

    async delete(id: string) {
        const resultado = await responsavelRepository.delete(id);

        return resultado;
    }
}

export default new ResponsavelService();