import { ResponsavelType } from '@lib/types/responsavelType';
import { AllowNull, Column, Length, Table, DataType, Model, ForeignKey, BelongsTo, HasMany, Min, Max, PrimaryKey, Unique, Scopes, DefaultScope, Default, HasOne } from "sequelize-typescript";

import JogadorModel from './jogadorModel';

@DefaultScope(() => ({
    include: [JogadorModel.unscoped()]
}))
@Table({
    tableName: process.env.MODEL_RESPONSAVEL_TABLE_NAME,
    paranoid: true,
})
export default class ResponsavelModel extends Model<ResponsavelType, Omit<ResponsavelType, "id">> {
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

    @ForeignKey(() => JogadorModel)
    @Column(DataType.UUIDV4)
    declare fk_jogador_id: string;

    @BelongsTo(() => JogadorModel, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    declare jogador: JogadorModel;
}