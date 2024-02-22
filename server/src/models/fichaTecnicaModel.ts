import { FichaTecnicaType } from '@lib/types/fichaTecnicaType';
import { AllowNull, Column, Table, DataType, Model, ForeignKey, BelongsTo, PrimaryKey} from "sequelize-typescript";

import PosicaoModel from './posicaoModel';
import TimeModel from './timeModel';
import JogadorModel from './jogadorModel';

@Table({
    tableName: process.env.MODEL_FICHA_TECNICA_TABLE_NAME,
    paranoid: true,
})
export default class FichaTecnicaModel extends Model<FichaTecnicaType> {
    @PrimaryKey
    @ForeignKey(() => JogadorModel)
    @Column(DataType.UUIDV4)
    declare fk_jogador_id: string;

    @ForeignKey(() => PosicaoModel)
    @Column(DataType.UUIDV4)
    declare fk_posicao_id: string;

    @PrimaryKey
    @ForeignKey(() => TimeModel)
    @Column(DataType.UUIDV4)
    declare fk_time_id: string;

    @AllowNull(false)
    @Column(DataType.TINYINT.UNSIGNED)
    declare altura: number;

    @AllowNull(false)
    @Column(DataType.TINYINT.UNSIGNED)
    declare peso: number;

    @AllowNull(false)
    @Column(DataType.ENUM('DIR', 'ESQ', 'AMB'))
    declare membro_inferior_dominante: 'DIR' | 'ESQ' | 'AMB';

    @AllowNull(false)
    @Column(DataType.ENUM('DIR', 'ESQ', 'AMB'))
    declare membro_superior_dominante: 'DIR' | 'ESQ' | 'AMB';

    @AllowNull(false)
    @Column(DataType.ENUM('AMADOR', 'MODERADO', 'VETERANO', 'PROFISSIONAL'))
    declare experiencia: 'AMADOR' | 'MODERADO' | 'VETERANO' | 'PROFISSIONAL';

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    declare is_capitao: boolean;

    @BelongsTo(() => PosicaoModel)
    declare posicao: PosicaoModel;

    @BelongsTo(() => TimeModel)
    declare time: TimeModel;

    @BelongsTo(() => JogadorModel)
    declare jogador: JogadorModel;
}
