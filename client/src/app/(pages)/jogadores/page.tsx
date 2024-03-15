"use client"

import Structure from "@/containers/Structure/Structure"
import CustomTable from "@/containers/Table/Table"

import { JogadorType } from "@/../../lib/types/jogadorType"
import { FormEvent, useEffect, useState } from "react"
import { handleCreate, handleDelete, handleGet } from "@/lib/tableHelper"
import FormDialog from "@/containers/FormDialog/FormDialog"
import TextField from '@mui/material/TextField';

import styles from './page.module.css'

const Jogadores = () => {
    const [data, setData] = useState<JogadorType[]>([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const [error, setError] = useState<string | null>()

    const [formValues, setFormValues] = useState({
        cpf: '',
        nome_completo: '',
        telefone: '',
        email: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            handleGet<JogadorType>("jogadores")
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

        handleCreate<JogadorType>("jogadores", formValues)
            .then((response) => {
                response.success ? setShouldRefetch(!shouldRefetch) : setError(response.response as string)
            })
    }

    const handleDeleteButton = (id: string) => {
        try {

            handleDelete("jogadores", id, shouldRefetch, setShouldRefetch)
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
        <Structure headerText="Controle de jogadores">
            <FormDialog
                buttonText="Adicionar jogador"
                title={"Adicionar jogador"}
                content={"Insira os dados do jogador"}
                onSubmit={handleCreateButton}
            >
                <TextField id="cpf" label="CPF" name="cpf" variant="outlined" value={formValues.cpf} onChange={handleChange} />
                <TextField id="nome_completo" label="Nome Completo" name="nome_completo" variant="outlined" value={formValues.nome_completo} onChange={handleChange} />
                <TextField id="telefone" label="Telefone" name="telefone" variant="outlined" value={formValues.telefone} onChange={handleChange} />
                <TextField id="email" label="Email" name="email" variant="outlined" value={formValues.email} onChange={handleChange} />
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

export default Jogadores