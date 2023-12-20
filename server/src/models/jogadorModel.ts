import { JogadorType } from '@lib/types/jogadorType';
import { AllowNull, Column, Length, Table, DataType, Model, PrimaryKey, Unique, DefaultScope, Default, HasOne} from "sequelize-typescript";

import ResponsavelModel from './responsavelModel';

@DefaultScope(() => ({
    include: {
        all: true,
        nested: true,
    }
}))
@Table({
    tableName: process.env.MODEL_JOGADOR_TABLE_NAME,
    paranoid: true,
})
export default class JogadorModel extends Model<JogadorType, Omit<JogadorType, "id">> {
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

    @HasOne(() => ResponsavelModel, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    declare responsavel: ResponsavelModel;
}