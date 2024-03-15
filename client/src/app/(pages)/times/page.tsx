"use client"

import Structure from "@/containers/Structure/Structure"
import CustomTable from "@/containers/Table/Table"

import { TimeType } from "@/../../lib/types/timeType"
import { EsporteType } from "@/../../lib/types/esporteType"
import { useEffect, useState } from "react"
import { handleCreate, handleDelete, handleGet } from "@/lib/tableHelper"

const Times = () => {
    const [data, setData] = useState<TimeType[]>([])
    const [shouldRefetch, setShouldRefetch] = useState(false)
    const [error, setError] = useState<string | null>()

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

    const handleCreateButton = async () => {
        const esportePost: EsporteType = {
            id: "",
            nome: "Esporte 1",
            maximo_jogadores_por_time: 10,
            maximo_jogadores_titulares: 10
        }

        const timePost: TimeType = {
            id: "",
            nome: "Time 1",
            email: "acasdasda@gmail.com",
            telefone: "1231231231232",
            escudo: "https://www.google.com.br",
            fk_esporte_id: "",
            localidade: "São Paulo",
            responsavel: "Responsável 1",
        }

        const esporte = await fetch(`http://localhost:5000/esportes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-JWT-token": localStorage.getItem("cm-jwt-token") || ""
            },
            body: JSON.stringify(esportePost)
        }).then(data => data.json())

        timePost.fk_esporte_id = esporte.id

        handleCreate<TimeType>("times", timePost)
        .then((response) => {
            response.success ? setShouldRefetch(!shouldRefetch) : setError(response.response as string)
        })

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

    return (
        <Structure headerText="Controle de times">
            <button onClick={handleCreateButton}>Create Time</button>
            {
                data[0] && (
                    <CustomTable
                        data={data}
                        onEdit={(row) => console.log("Edit", row)}
                        onDelete={(row) => handleDeleteButton(row.id)}
                    />
                )
            }
            {error}
        </Structure>
    )
}

export default Times