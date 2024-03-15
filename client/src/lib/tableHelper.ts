import { SetStateAction } from "react"

interface ErrorType {
    message: string
    stack: string
    campos: {
        nome: string
        validacao: string
    }[]
}

const handleGet = async <T>(route: string, setter: React.Dispatch<SetStateAction<T[]>>, query?: string[]) => {
    const queryString = query ? `?${query.join("&")}` : ""

    try {
        const response = await fetch(`http://localhost:5000/${route}${queryString}`, {
            headers: {
                "X-JWT-token": localStorage.getItem("cm-jwt-token") || ""
            }
        })
        const data = await response.json()
        setter(data)
        return data
    } catch (error: any) {
        console.error(`Erro: ${error.message} \nStack: ${error.stack} \nCampos: ${error.campos.map(campo => `${campo.nome}: ${campo.validacao}`).join(", ")}`)
    }
}

const handleCreate = async <T>(route: string, post: T, setter: React.Dispatch<SetStateAction<T[]>>) => {
    try {
        const response = await fetch(`http://localhost:5000/${route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-JWT-token": localStorage.getItem("cm-jwt-token") || ""
            },
            body: JSON.stringify(post)
        })
        const data = await response.json()
        setter([data])
        return data
    } catch (error: any) {
        console.error(`Erro: ${error.message} \nStack: ${error.stack} \nCampos: ${error.campos.map(campo => `${campo.nome}: ${campo.validacao}`).join(", ")}`)
    }
}

const handleDelete = async (route: string, id: string, shouldRefetch: boolean, setShouldRefetch: React.Dispatch<SetStateAction<boolean>>) => {
    try {
        await fetch(`http://localhost:5000/${route}?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-JWT-token": localStorage.getItem("cm-jwt-token") || ""
            }
        })
        setShouldRefetch(!shouldRefetch)
    } catch (error: any) {
        console.error(`Erro: ${error.message} \nStack: ${error.stack} \nCampos: ${error.campos.map(campo => `${campo.nome}: ${campo.validacao}`).join(", ")}`)
    }
}

export {
    handleGet,
    handleCreate,
    handleDelete
}