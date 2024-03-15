'use client'
import Structure from "@/containers/Structure/Structure"
import CustomTable from "@/containers/Table/Table"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { EnderecoType } from "@/../../lib/types/enderecoType"
import { FormEvent, useEffect, useState } from "react"
import { handleCreate, handleDelete, handleGet } from "@/lib/tableHelper"
import FormDialog from "@/containers/FormDialog/FormDialog"
import TextField from '@mui/material/TextField';

import { JogadorType } from "../../../../../lib/types/jogadorType";

import styles from './page.module.css'

const Enderecos = () => {
    const [data, setData] = useState<EnderecoType[]>([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const [error, setError] = useState<string | null>()
    const [jogadores, setJogadores] = useState<JogadorType[]>([]);

    const [formValues, setFormValues] = useState({
        fk_jogador_id: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        cep: '',
        estado: '',
        pais: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            handleGet<EnderecoType>("enderecos")
                .then((response) => {
                    response.success ? setData(response.response as []) : setError(response.response as any)
                })
            handleGet<JogadorType>("jogadores")
                .then((response) => {
                    response.success ? setJogadores(response.response as []) : setError(response.response as any)
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

        handleCreate<EnderecoType>("enderecos", formValues)
            .then((response) => {
                response.success ? setShouldRefetch(!shouldRefetch) : setError(response.response as string)
            })
    }
    

    const handleDeleteButton = (fk_jogador_id: string) => {
        try {

            handleDelete("enderecos", fk_jogador_id, shouldRefetch, setShouldRefetch)
                .then((response) => {
                    response.success ? setData(data.filter((item) => item.fk_jogador_id !== fk_jogador_id)) : setError(response.response as string)
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
        <Structure headerText="Controle de endereços">
            <FormDialog
                buttonText="Adicionar endereço"
                title={"Adicionar endereço"}
                content={"Insira os dados do endereço"}
                onSubmit={handleCreateButton}
            >
                <Select
                    id="fk_jogador_id"
                    name="fk_jogador_id"
                    value={formValues.fk_jogador_id}
                    onChange={handleSelectChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Selecione um jogador
                    </MenuItem>
                    {jogadores.map((jogador) => (
                        <MenuItem key={jogador.id} value={jogador.id}>{jogador.nome_completo}</MenuItem>
                    ))}
                </Select>
                <TextField id="logradouro" label="Logradouro" name="logradouro" variant="outlined" value={formValues.logradouro} onChange={handleChange} />
                <TextField id="numero" label="Número" name="numero" variant="outlined" value={formValues.numero} onChange={handleChange} />
                <TextField id="bairro" label="Bairro" name="bairro" variant="outlined" value={formValues.bairro} onChange={handleChange} />
                <TextField id="cidade" label="Cidade" name="cidade" variant="outlined" value={formValues.cidade} onChange={handleChange} />
                <TextField id="cep" label="CEP" name="cep" variant="outlined" value={formValues.cep} onChange={handleChange} />
                <TextField id="estado" label="Estado" name="estado" variant="outlined" value={formValues.estado} onChange={handleChange} />
                <TextField id="pais" label="País" name="pais" variant="outlined" value={formValues.pais} onChange={handleChange} />
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

export default Enderecos