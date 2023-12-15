import { ResponsavelType } from '@lib/types/responsavelType';
import { AllowNull, Column, Length, Table, DataType, Model, ForeignKey, BelongsTo, HasMany, Min, Max, PrimaryKey, Unique, Scopes, DefaultScope, Default} from "sequelize-typescript";

import JogadorModel from './jogadorModel';

@DefaultScope(() => ({
    attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
}))
@Table({
    tableName: process.env.MODEL_RESPONSAVEL_TABLE_NAME,
    paranoid: true,
})
export default class ResponsavelModel extends Model<ResponsavelType, Omit<ResponsavelType, "id">> {
    @PrimaryKey
    @Length({ min: 36, max: 36 })
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Length({ min: 11, max: 11 })
    @Column(DataType.STRING(11))
    declare cpf: string;

    @AllowNull(false)
    @Length({ min: 8, max: 256 })
    @Column(DataType.STRING(256))
    declare nome_completo: string;

    @AllowNull(false)
    @Length({ min: 1, max: 13 })
    @Column(DataType.STRING(13))
    declare telefone: string;

    @AllowNull(false)
    @Length({ min: 1, max: 128 })
    @Column(DataType.STRING(128))
    declare email: string;

    @AllowNull(false)
    @Length({ min: 36, max: 36 })
    @ForeignKey(() => JogadorModel)
    @Column(DataType.UUID)
    declare fk_jogador_id: string;

    @BelongsTo(() => JogadorModel, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    declare jogador: JogadorModel;
}