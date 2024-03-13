import { PosicaoType } from '@lib/types/posicaoType';
import { AllowNull, Column, Length, Table, DataType, Model, ForeignKey, BelongsTo, PrimaryKey, Unique, HasOne, HasMany, Default } from "sequelize-typescript";

import Esporte from './esporteModel';
import FichaTecnicaModel from './fichaTecnicaModel';

@Table({
    tableName: process.env.MODEL_POSICAO_TABLE_NAME,
    paranoid: true,
})
export default class PosicaoModel extends Model<PosicaoType, Omit<PosicaoType, "id">> {
    @PrimaryKey
    @ForeignKey(() => Esporte)
    @Column(DataType.UUIDV4)
    declare fk_esporte_id: string;

    @AllowNull(false)
    @Length({ min: 1, max: 128 })
    @Unique
    @Column(DataType.STRING(128))
    declare nome: string;

    @AllowNull(false)
    @Unique
    @Default(DataType.UUIDV4)
    @Column(DataType.UUIDV4)
    declare id: string;

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

    @HasOne(() => FichaTecnicaModel, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    declare posicao: FichaTecnicaModel;
}