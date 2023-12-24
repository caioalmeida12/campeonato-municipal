import { EnderecoType } from '@lib/types/enderecoType';
import { AllowNull, Column, Length, Table, DataType, Model, PrimaryKey, DefaultScope, ForeignKey, BelongsTo } from "sequelize-typescript";
import JogadorModel from './jogadorModel';

@DefaultScope(() => ({
    include: [JogadorModel.unscoped()]
}))
@Table({
    tableName: process.env.MODEL_ENDERECO_TABLE_NAME,
    paranoid: true,
})
export default class EnderecoModel extends Model<EnderecoType, Omit<EnderecoType, "fk_jogador_id">> {
    @PrimaryKey
    @ForeignKey(() => JogadorModel)
    @Column(DataType.UUIDV4)
    declare fk_jogador_id: string;

    @AllowNull(false)
    @Length({ min: 1, max: 128 })
    @Column(DataType.STRING(128))
    declare logradouro: string;

    @AllowNull(false)
    @Length({ min: 1, max: 8 })
    @Column(DataType.STRING(8))
    declare numero: string;

    @AllowNull(false)
    @Length({ min: 1, max: 64 })
    @Column(DataType.STRING(64))
    declare bairro: string;

    @AllowNull(false)
    @Length({ min: 1, max: 64 })
    @Column(DataType.STRING(64))
    declare cidade: string;

    @AllowNull(false)
    @Length({ min: 1, max: 8 })
    @Column(DataType.STRING(8))
    declare cep: string;

    @AllowNull(false)
    @Length({ min: 1, max: 64 })
    @Column(DataType.STRING(64))
    declare estado: string;

    @AllowNull(false)
    @Length({ min: 1, max: 64 })
    @Column(DataType.STRING(64))
    declare pais: string;

    @BelongsTo(() => JogadorModel, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    declare jogador: JogadorModel;
}