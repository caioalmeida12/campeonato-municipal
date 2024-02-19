import { TimeType } from '@lib/types/timeType';
import { AllowNull, Column, Length, Table, DataType, Model, ForeignKey, BelongsTo, PrimaryKey, Unique, Default } from "sequelize-typescript";

import Esporte from './esporteModel';

@Table({
    tableName: process.env.MODEL_TIME_TABLE_NAME,
    paranoid: true,
})
export default class TimeModel extends Model<TimeType> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUIDV4)
    declare id: string;

    @AllowNull(false)
    @Length({ min: 1, max: 64 })
    @Unique
    @Column(DataType.STRING(64))
    declare nome: string;

    @AllowNull(false)
    @Length({ min: 1, max: 128 })
    @Unique
    @Column(DataType.STRING(128))
    declare localidade: string;

    @AllowNull(false)
    @Length({ min: 1, max: 128 })
    @Unique
    @Column(DataType.STRING(128))
    declare responsavel: string;

    @AllowNull(false)
    @Length({ min: 1, max: 13 })
    @Unique
    @Column(DataType.STRING(13))
    declare telefone: string;

    @AllowNull(false)
    @Length({ min: 1, max: 128 })
    @Unique
    @Column(DataType.STRING(128))
    declare email: string;

    @AllowNull(false)
    @Length({ min: 1, max: 256 })
    @Unique
    @Column(DataType.STRING(256))
    declare escudo: string;

    @ForeignKey(() => Esporte)
    @Column(DataType.UUIDV4)
    declare fk_esporte_id: string;

    @BelongsTo(() => Esporte, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    declare esporte: Esporte;
}