import { UsuarioType } from '@lib/types/usuarioType';
import { AllowNull, Column, Length, Table, DataType, Model, PrimaryKey, Unique, DefaultScope, Default, HasOne, BeforeSave } from "sequelize-typescript";
import bcrypt from 'bcrypt';

@Table({
    tableName: process.env.MODEL_USUARIO_TABLE_NAME,
    paranoid: true,
})
export default class UsuarioModel extends Model<UsuarioType, Omit<UsuarioType, "id">> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUIDV4)
    declare id: string;

    @Unique
    @AllowNull(false)
    @Length({ min: 11, max: 11 })
    @Column(DataType.STRING(11))
    declare cpf: string;

    @AllowNull(false)
    @Length({ min: 1, max: 128 })
    @Column(DataType.STRING(128))
    declare nome_completo: string;

    @AllowNull(false)
    @Length({ min: 11, max: 13 })
    @Column(DataType.STRING(13))
    declare telefone: string;

    @AllowNull(false)
    @Length({ min: 1, max: 128 })
    @Column(DataType.STRING(128))
    declare email: string;

    @AllowNull(false)
    @Length({ min: 8, max: 256 })
    @Column(DataType.STRING(256))
    declare senha: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    declare data_nascimento: Date;

    @BeforeSave
    static async hashPassword(usuario: UsuarioModel) {
        if (usuario.changed('senha')) {
            const salt = await bcrypt.genSalt();
            usuario.senha = await bcrypt.hash(usuario.senha, salt);
        }
    }
}