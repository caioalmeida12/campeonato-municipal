"use client"

import Structure from "@/containers/Structure/Structure"
import CustomTable from "@/containers/Table/Table"
import { FichaTecnicaType } from "@/../../lib/types/fichaTecnicaType"
import { FormEvent, SetStateAction, useEffect, useState } from "react"
import { handleCreate, handleGet } from "@/lib/tableHelper"
import FormDialog from "@/containers/FormDialog/FormDialog"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import styles from './page.module.css'

interface ErrorType {
    message: string
    stack: string
    campos: {
        nome: string
        validacao: string
    }[]
}

interface ResponseType<T> {
    success: boolean
    response: T[] | string | null
}
const FichasTecnicas = () => {
    const [data, setData] = useState<FichaTecnicaType[]>([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const [error, setError] = useState<string | null>()

    const [jogadores, setJogadores] = useState<any[]>([])
    const [posicoes, setPosicoes] = useState<any[]>([])
    const [times, setTimes] = useState<any[]>([])

    const [formValues, setFormValues] = useState({
        fk_jogador_id: '',
        fk_posicao_id: '',
        fk_time_id: '',
        altura: '',
        peso: '',
        membro_inferior_dominante: '',
        membro_superior_dominante: '',
        experiencia: '',
        is_capitao: false
    });

    useEffect(() => {
        const fetchData = async () => {
            handleGet<FichaTecnicaType>("fichas-tecnicas")
                .then((response) => {
                    response.success ? setData(response.response as []) : setError(response.response as any)
                })

            handleGet<any>("jogadores")
                .then((response) => {
                    response.success ? setJogadores(response.response as []) : setError(response.response as any)
                })
            handleGet<any>("posicoes")
                .then((response) => {
                    response.success ? setPosicoes(response.response as []) : setError(response.response as any)
                })
            handleGet<any>("times")
                .then((response) => {
                    response.success ? setTimes(response.response as []) : setError(response.response as any)
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

        handleCreate<FichaTecnicaType>("fichas-tecnicas", formValues)
            .then((response) => {
                response.success ? setShouldRefetch(!shouldRefetch) : setError(response.response as string)
            })
    }

    
const handleDelete = async (route: string, id: string, shouldRefetch: boolean, setShouldRefetch: React.Dispatch<SetStateAction<boolean>>) => {
    let result: ResponseType<boolean> = { success: false, response: null };

    const response = await fetch(`http://localhost:5000/${route}?fk_jogador_id=${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-JWT-token": localStorage.getItem("cm-jwt-token") || ""
        }
    })

    if (!response.ok) {
        const data = await response.json()

        result.response = errorFormatter(data);
        return result;
    }

    result.success = true;
    result.response = "Deletado com sucesso!";
    setShouldRefetch(!shouldRefetch);

    return result;
}

    const handleDeleteButton = (fk_jogador_id: string) => {
        try {
            handleDelete("fichas-tecnicas", fk_jogador_id, shouldRefetch, setShouldRefetch)
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
        <Structure headerText="Controle de fichas técnicas">
            <FormDialog
                buttonText="Adicionar ficha técnica"
                title={"Adicionar ficha técnica"}
                content={"Insira os dados da ficha técnica"}
                onSubmit={handleCreateButton}
            >
                <InputLabel id="fk_jogador_id">Jogador</InputLabel>
                <Select
                    id="fk_jogador_id"
                    name="fk_jogador_id"
                    value={formValues.fk_jogador_id}
                    onChange={handleSelectChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Selecione um jogador</MenuItem>
                    {jogadores.map((jogador) => (
                        <MenuItem key={jogador.id} value={jogador.id}>{jogador.nome_completo}</MenuItem>
                    ))}
                </Select>

                <InputLabel id="fk_posicao_id">Posição</InputLabel>
                <Select
                    id="fk_posicao_id"
                    name="fk_posicao_id"
                    value={formValues.fk_posicao_id}
                    onChange={handleSelectChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Selecione uma posição</MenuItem>
                    {posicoes.map((posicao) => (
                        <MenuItem key={posicao.id} value={posicao.id}>{posicao.nome}</MenuItem>
                    ))}
                </Select>

                <InputLabel id="fk_time_id">Time</InputLabel>
                <Select
                    id="fk_time_id"
                    name="fk_time_id"
                    value={formValues.fk_time_id}
                    onChange={handleSelectChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Selecione um time</MenuItem>
                    {times.map((time) => (
                        <MenuItem key={time.id} value={time.id}>{time.nome}</MenuItem>
                    ))}
                </Select>
                <TextField id="altura" label="Altura (cm)" name="altura" variant="outlined" value={formValues.altura} onChange={handleChange} />
                <TextField id="peso" label="Peso (kg)" name="peso" variant="outlined" value={formValues.peso} onChange={handleChange} />

                <InputLabel id="membro_inferior_dominante">Membro inferior dominante</InputLabel>
                <Select
                    id="membro_inferior_dominante"
                    name="membro_inferior_dominante"
                    value={formValues.membro_inferior_dominante}
                    onChange={handleSelectChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Selecione o membro inferior dominante</MenuItem>
                    <MenuItem value="DIR">Direito</MenuItem>
                    <MenuItem value="ESQ">Esquerdo</MenuItem>
                    <MenuItem value="AMB">Ambos</MenuItem>
                </Select>

                <InputLabel id="membro_superior_dominante">Membro superior dominante</InputLabel>
                <Select
                    id="membro_superior_dominante"
                    name="membro_superior_dominante"
                    value={formValues.membro_superior_dominante}
                    onChange={handleSelectChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Selecione o membro superior dominante</MenuItem>
                    <MenuItem value="DIR">Direito</MenuItem>
                    <MenuItem value="ESQ">Esquerdo</MenuItem>
                    <MenuItem value="AMB">Ambos</MenuItem>
                </Select>

                <InputLabel id="experiencia">Experiência</InputLabel>
                <Select
                    id="experiencia"
                    name="experiencia"
                    value={formValues.experiencia}
                    onChange={handleSelectChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>Selecione a experiência</MenuItem>
                    <MenuItem value="AMADOR">Amador</MenuItem>
                    <MenuItem value="MODERADO">Moderado</MenuItem>
                    <MenuItem value="VETERANO">Veterano</MenuItem>
                    <MenuItem value="PROFISSIONAL">Profissional</MenuItem>
                </Select>

                <InputLabel id="is_capitao">Capitão</InputLabel>
                <Select
                    id="is_capitao"
                    name="is_capitao"
                    value={formValues.is_capitao}
                    onChange={event => setFormValues({ ...formValues, is_capitao: event.target.value === 'true' })}
                    variant="outlined"
                >
                    <MenuItem value={"true"}>Sim</MenuItem>
                    <MenuItem value={"false"}>Não</MenuItem>
                </Select>
            </FormDialog>
            <div className={styles.wrapper}>
                {
                    data[0] && (
                        <CustomTable
                            data={data}
                            onDelete={(row: any) => handleDeleteButton(row.fk_jogador_id)}
                        />
                    )
                }
                <span className={styles.error}>{error}</span>
            </div>
        </Structure>
    )
}

const errorFormatter = (error: ErrorType) => {
    let message = error.message

    if (typeof error.campos === "undefined") {
        return message
    }

    error.campos.forEach((campo) => {
        message += `\n[${campo.nome}: ${campo.validacao}]`
    })

    return message
}

export default FichasTecnicas
