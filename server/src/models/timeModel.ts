import { TimeType } from '@lib/types/timeType';
import { AllowNull, Column, Length, DataType, Model, ForeignKey, BelongsTo, PrimaryKey, Unique, DefaultScope, Default, Table } from "sequelize-typescript";

import EsporteModel from './esporteModel';

@DefaultScope(() => ({
    include: [EsporteModel.unscoped()]
}))
@Table({
    tableName: process.env.MODEL_TIME_TABLE_NAME,
    paranoid: true,
})
export default class TimeModel extends Model<TimeType, Omit<TimeType, "id">> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUIDV4)
    declare id: string;

    @Unique
    @AllowNull(false)
    @Length({ min: 1, max: 64 })
    @Column(DataType.STRING(64))
    declare nome: string;

    @AllowNull(false)
    @Length({ min: 1, max: 128 })
    @Column(DataType.STRING(128))
    declare localidade: string;

    @AllowNull(false)
    @Length({ min: 1, max: 128 })
    @Column(DataType.STRING(128))
    declare responsavel: string;

    @AllowNull(false)
    @Length({ min: 1, max: 13 })
    @Column(DataType.STRING(13))
    declare telefone: string;

    @AllowNull(false)
    @Length({ min: 1, max: 128 })
    @Column(DataType.STRING(128))
    declare email: string;

    @AllowNull(false)
    @Length({ min: 1, max: 256 })
    @Column(DataType.STRING(256))
    declare escudo: string;

    @ForeignKey(() => EsporteModel)
    @Column(DataType.UUIDV4)
    declare fk_esporte_id: string;

    @BelongsTo(() => EsporteModel, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    declare esporte: EsporteModel;
}
