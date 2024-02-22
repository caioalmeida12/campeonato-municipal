import { PosicaoType } from '@lib/types/posicaoType';
import { AllowNull, Column, Length, Table, DataType, Model, ForeignKey, BelongsTo, PrimaryKey, Unique, HasOne, HasMany } from "sequelize-typescript";

import Esporte from './esporteModel';
import FichaTecnicaModel from './fichaTecnicaModel';

@Table({
    tableName: process.env.MODEL_POSICAO_TABLE_NAME,
    paranoid: true,
})
export default class PosicaoModel extends Model<PosicaoType> {
    @PrimaryKey
    @ForeignKey(() => Esporte)
    @Column(DataType.UUIDV4)
    declare fk_esporte_id: string;

    @AllowNull(false)
    @Length({ min: 1, max: 128 })
    @Unique
    @Column(DataType.STRING(128))
    declare nome: string;

    @BelongsTo(() => Esporte, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    declare esporte: Esporte;
    
    @HasMany(() => FichaTecnicaModel, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    declare fichaTecnica: FichaTecnicaModel;
}