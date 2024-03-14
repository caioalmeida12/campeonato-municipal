import UsuarioModel from "@server/models/usuarioModel";
import { Op } from "sequelize";

class UsuarioRepository {
    async findAll(camposParaBusca?: Array<{ campo: string, valor: unknown }>): Promise<UsuarioModel[]> {
        const filtros = {
            usuario: camposParaBusca?.map(campoParaBusca => ({ [campoParaBusca.campo]: campoParaBusca.valor })),
        }

        const where = {
            [Op.and]: filtros.usuario,
        }

        if (!camposParaBusca?.length) return UsuarioModel.findAll();

        return UsuarioModel.findAll({
            where
        });
    }

    async findByEmail(email: string): Promise<UsuarioModel | null> {
        return UsuarioModel.findOne({ where: { email } });
    }

    // async create(body: UsuarioType): Promise<UsuarioModel> {
    //     const resultado = await sequelize.transaction(async (t) => {
    //         const usuario = await UsuarioModel.create(body, {
    //             transaction: t,
    //             include: [ResponsavelModel.unscoped(), EnderecoModel.unscoped()],
    //         });

    //         return usuario;
    //     });

    //     return resultado;
    // }

    // async update(id: string, body: UsuarioType): Promise<UsuarioModel | undefined> {
    //     const usuario = await UsuarioModel.findByPk(id);

    //     return usuario?.update(body);
    // }

    // async delete(id: string): Promise<void | undefined> {
    //     const usuario = await UsuarioModel.findByPk(id);

    //     return usuario?.destroy();
    // }
}

export default new UsuarioRepository();