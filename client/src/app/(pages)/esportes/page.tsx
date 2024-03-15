"use client"

import Structure from "@/containers/Structure/Structure"
import CustomTable from "@/containers/Table/Table"

import { EsporteType } from "@/../../lib/types/esporteType"
import { FormEvent, useEffect, useState } from "react"
import { handleCreate, handleDelete, handleGet } from "@/lib/tableHelper"
import FormDialog from "@/containers/FormDialog/FormDialog"
import TextField from '@mui/material/TextField';

import styles from './page.module.css'

const Esportes = () => {
    const [data, setData] = useState<EsporteType[]>([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const [error, setError] = useState<string | null>()

    const [formValues, setFormValues] = useState({
        nome: '',
        maximo_jogadores_por_time: '',
        maximo_jogadores_titulares: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            handleGet<EsporteType>("esportes")
                .then((response) => {
                    response.success ? setData(response.response as []) : setError(response.response as any)
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

        handleCreate<EsporteType>("esportes", formValues)
            .then((response) => {
                response.success ? setShouldRefetch(!shouldRefetch) : setError(response.response as string)
            })
    }

    const handleDeleteButton = (id: string) => {
        try {

            handleDelete("esportes", id, shouldRefetch, setShouldRefetch)
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

    return (
        <Structure headerText="Controle de esportes">
            <FormDialog
                buttonText="Criar novo esporte"
                title={"Criar novo esporte"}
                content={"Insira os dados do esporte"}
                onSubmit={handleCreateButton}
            >
                <TextField id="nome" label="Nome do esporte" name="nome" variant="outlined" value={formValues.nome} onChange={handleChange} />
                <TextField id="maximo_jogadores_por_time" label="Máximo de jogadores por time" name="maximo_jogadores_por_time" variant="outlined" value={formValues.maximo_jogadores_por_time} onChange={handleChange} />
                <TextField id="maximo_jogadores_titulares" label="Máximo de jogadores titulares" name="maximo_jogadores_titulares" variant="outlined" value={formValues.maximo_jogadores_titulares} onChange={handleChange} />
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

export default Esportes