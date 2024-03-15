'use client'
import Structure from "@/containers/Structure/Structure"
import CustomTable from "@/containers/Table/Table"

import { DocumentoType } from "@/../../lib/types/documentoType"
import { FormEvent, useEffect, useState, useRef } from "react"
import { handleCreate, handleDelete, handleGet } from "@/lib/tableHelper"
import FormDialog from "@/containers/FormDialog/FormDialog"
import TextField from '@mui/material/TextField';
import { JogadorType } from "../../../../../lib/types/jogadorType"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import styles from './page.module.css'

const Documentos = () => {
    const [data, setData] = useState<DocumentoType[]>([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const [error, setError] = useState<string | null>()
    const [jogadores, setJogadores] = useState<JogadorType[]>([]);

    const [formValues, setFormValues] = useState({
        fk_jogador_id: '',
        tipo: '',
        iv: '',
        validade: '',
        data: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            handleGet<DocumentoType>("documentos")
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

        handleCreate<DocumentoType>("documentos", formValues)
            .then((response) => {
                response.success ? setShouldRefetch(!shouldRefetch) : setError(response.response as string)
            })
    }

    

    const handleSelectChange = (event: SelectChangeEvent) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    const handleDeleteButton = (id: string) => {
        try {

            handleDelete("documentos", id, shouldRefetch, setShouldRefetch)
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
        <Structure headerText="Controle de documentos">
            <FormDialog
                buttonText="Criar novo documento"
                title={"Criar novo documento"}
                content={"Insira os dados do documento"}
                onSubmit={handleCreateButton}
            >
                {/* <TextField id="fk_jogador_id" label="ID do Jogador" name="fk_jogador_id" variant="outlined" value={formValues.fk_jogador_id} onChange={handleChange} /> */}
                {/* <TextField id="tipo" label="Tipo de Documento" name="tipo" variant="outlined" value={formValues.tipo} onChange={handleChange} /> */}
                <Select
                    id="tipo"
                    name="tipo"
                    value={formValues.tipo}
                    onChange={handleChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Selecione o tipo de documento
                    </MenuItem>
                    <MenuItem value="RG">RG</MenuItem>
                    <MenuItem value="CPF">CPF</MenuItem>
                    <MenuItem value="CNH">CNH</MenuItem>
                    <MenuItem value="Passaporte">Passaporte</MenuItem>
                    <MenuItem value="Certidão de Nascimento">Certidão de Nascimento</MenuItem>
                    <MenuItem value="Título de Eleitor">Título de Eleitor</MenuItem>
                    <MenuItem value="Carteira de Trabalho">Carteira de Trabalho</MenuItem>
                    <MenuItem value="Certificado de Reservista">Certificado de Reservista</MenuItem>
                    <MenuItem value="Cartão do SUS">Cartão do SUS</MenuItem>
                    <MenuItem value="Carteira de Estudante">Carteira de Estudante</MenuItem>
                    <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                    <MenuItem value="Carteira de Identidade Profissional">Carteira de Identidade Profissional</MenuItem>
                    <MenuItem value="Carteira de Habilitação Internacional">Carteira de Habilitação Internacional</MenuItem>
                    <MenuItem value="Outro documento não listado">Outro documento não listado</MenuItem>
                </Select>
                <TextField id="iv" label="IV" name="iv" variant="outlined" value={formValues.iv} onChange={handleChange} />
                <TextField id="validade" label="Validade" name="validade" variant="outlined" value={formValues.validade} onChange={handleChange} />
                <TextField id="data" label="Data" name="data" variant="outlined" value={formValues.data} onChange={handleChange} />
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

export default Documentos