import { AllowNull, Column, Table, DataType, Model, PrimaryKey, ForeignKey, BelongsTo } from "sequelize-typescript";
import JogadorModel from './jogadorModel';
import { DocumentoType } from "@lib/types/documentoType";

@Table({
    tableName: process.env.MODEL_DOCUMENTO_TABLE_NAME,
    paranoid: true,
})
export default class DocumentoModel extends Model<DocumentoType> {
    @PrimaryKey
    @ForeignKey(() => JogadorModel)
    @Column(DataType.UUIDV4)
    declare fk_jogador_id: string;

    @PrimaryKey
    @AllowNull(false)
    @Column(DataType.STRING)
    declare tipo: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    declare link: string;

    @AllowNull(false)
    @Column(DataType.DATE)
    declare validade: Date;

    @AllowNull(false)
    @Column(DataType.BLOB)
    declare data: Buffer;

    @BelongsTo(() => JogadorModel, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    declare jogador: JogadorModel;
}