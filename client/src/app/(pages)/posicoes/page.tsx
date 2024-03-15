"use client"

import Structure from "@/containers/Structure/Structure"
import CustomTable from "@/containers/Table/Table"

import { PosicaoType } from "@/../../lib/types/posicaoType"
import { EsporteType } from "@/../../lib/types/esporteType"
import { FormEvent, useEffect, useState } from "react"
import { handleCreate, handleDelete, handleGet } from "@/lib/tableHelper"
import FormDialog from "@/containers/FormDialog/FormDialog"
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import styles from './page.module.css'

const Posicoes = () => {
    const [data, setData] = useState<PosicaoType[]>([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const [error, setError] = useState<string | null>()
    const [esportes, setEsportes] = useState<EsporteType[] | null>()

    const [formValues, setFormValues] = useState({
        fk_esporte_id: '',
        nome: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            handleGet<PosicaoType>("posicoes")
                .then((response) => {
                    response.success ? setData(response.response as []) : setError(response.response as any)
                })

            handleGet<EsporteType>("esportes")
                .then((response) => {
                    response.success ? setEsportes(response.response as []) : setError(response.response as any)
                })
        }
        fetchData()
    }, [shouldRefetch]);

    useEffect(() => {
        if (data[0]) {
            setError(null)
        }
    }, [data])

    const handleCreateButton = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        let formValues: any = {};
        formData.forEach((value, key) => {
            formValues[key] = value;
        });

        handleCreate<PosicaoType>("posicoes", formValues)
            .then((response) => {
                response.success ? setShouldRefetch(!shouldRefetch) : setError(response.response as string)
            })
    }

    const handleDeleteButton = (id: string) => {
        try {

            handleDelete("posicoes", id, shouldRefetch, setShouldRefetch)
                .then((response) => {
                    response.success ? setData(data.filter((item) => item.id !== id)) : setError(response.response as string)
                })

        } catch (error: any) {
            setError(error)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Structure headerText="Controle de posições">
            <FormDialog
                buttonText="Criar nova posição"
                title={"Criar nova posição"}
                content={"Insira os dados da posição"}
                onSubmit={handleCreateButton}
            >
                <Select
                    labelId="fk-esporte-id-label"
                    id="fk-esporte-id"
                    name="fk_esporte_id"
                    value={formValues.fk_esporte_id || ""}
                    label="Esporte da posição"
                    onChange={handleSelectChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Selecione um esporte
                    </MenuItem>
                    {esportes?.map((esporte) => (
                        <MenuItem key={esporte.id} value={esporte.id}>{esporte.nome}</MenuItem>
                    ))}
                </Select>
                <TextField id="nome" label="Nome da posição" name="nome" variant="outlined" value={formValues.nome} onChange={handleChange} />
            </FormDialog>
            <div className={styles.wrapper}>
                {
                    data[0] && (
                        <CustomTable
                            data={data}
                            onDelete={(row) => handleDeleteButton(row.id)}
                        />
                    )
                }
                <span className={styles.error}>{error}</span>
            </div>
        </Structure>
    )
}

export default Posicoes