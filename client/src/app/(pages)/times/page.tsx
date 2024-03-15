"use client"

import Structure from "@/containers/Structure/Structure"
import CustomTable from "@/containers/Table/Table"

import { TimeType } from "@/../../lib/types/timeType"
import { EsporteType } from "@/../../lib/types/esporteType"
import { FormEvent, useEffect, useState } from "react"
import { handleCreate, handleDelete, handleGet } from "@/lib/tableHelper"
import FormDialog from "@/containers/FormDialog/FormDialog"
import TextField from '@mui/material/TextField';

import styles from './page.module.css'

const Times = () => {
    const [data, setData] = useState<TimeType[]>([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const [error, setError] = useState<string | null>()
    const [formMethod, setFormMethod] = useState<"POST" | "PUT">("POST")

    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        telefone: '',
        escudo: '',
        localidade: '',
        responsavel: '',
        fk_esporte_id: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            handleGet<TimeType>("times")
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

        const esportePost: EsporteType = {
            id: "",
            nome: "Esporte 1",
            maximo_jogadores_por_time: 10,
            maximo_jogadores_titulares: 10
        }

        const esporte = await fetch(`http://localhost:5000/esportes`, {
            method: formMethod,
            headers: {
                "Content-Type": "application/json",
                "X-JWT-token": localStorage.getItem("cm-jwt-token") || ""
            },
            body: JSON.stringify(esportePost)
        }).then(data => data.json())

        if (esporte.id) formValues.fk_esporte_id = esporte.id

        handleCreate<TimeType>("times", formValues)
            .then((response) => {
                response.success ? setShouldRefetch(!shouldRefetch) : setError(response.response as string)
            })
    }

    const handleEditButton = (id: string) => {
        

        const time = data.find((item) => item.id === id)
        if (time) {
            setFormValues(time)
            setFormMethod("PUT")
        }
    }

    const handleDeleteButton = (id: string) => {
        try {

            handleDelete("times", id, shouldRefetch, setShouldRefetch)
                .then((response) => {
                    response.success ? setData(data.filter((item) => item.id !== id)) : setError(response.response as string)
                })

        } catch (error: any) {
            setError(error)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Structure headerText="Controle de times">
            <FormDialog
                buttonText="Criar novo time"
                title={"Criar novo time"}
                content={"Insira os dados do time"}
                onSubmit={handleCreateButton}
            >
                <TextField id="nome" label="Nome do time" name="nome" variant="outlined" value={formValues.nome} onChange={handleChange} />
                <TextField id="email" label="Email do time" name="email" variant="outlined" value={formValues.email} onChange={handleChange} />
                <TextField id="telefone" label="Telefone do time" name="telefone" variant="outlined" value={formValues.telefone} onChange={handleChange} />
                <TextField id="escudo" label="Escudo do time (link)" name="escudo" variant="outlined" value={formValues.escudo} onChange={handleChange} />
                <TextField id="localidade" label="Localidade" name="localidade" variant="outlined" value={formValues.localidade} onChange={handleChange} />
                <TextField id="responsavel" label="Responsável" name="responsavel" variant="outlined" value={formValues.responsavel} onChange={handleChange} />

            </FormDialog>
            <div className={styles.wrapper}>
                {
                    data[0] && (
                        <CustomTable
                            data={data}
                            onEdit={(row) => handleEditButton(row.id)}
                            onDelete={(row) => handleDeleteButton(row.id)}
                        />
                    )
                }
                <span className={styles.error}>{error}</span>
            </div>
        </Structure>
    )
}

export default Times