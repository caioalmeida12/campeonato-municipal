import { EsporteType } from '@lib/types/esporteType';
import { AllowNull, Column, Length, Table, DataType, Model, PrimaryKey, Default } from "sequelize-typescript";

@Table({
    tableName: process.env.MODEL_ESPORTE_TABLE_NAME,
    paranoid: true,
})
export default class EsporteModel extends Model<EsporteType, Omit<EsporteType, "id">> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUIDV4)
    declare id: string;

    @AllowNull(false)
    @Length({ min: 2, max: 64 })
    @Column(DataType.STRING(64))
    declare nome: string;

    @AllowNull(false)
    @Column(DataType.TINYINT.UNSIGNED)
    declare maximo_jogadores_por_time: number;

    @AllowNull(false)
    @Column(DataType.TINYINT.UNSIGNED)
    declare maximo_jogadores_titulares: number;
}