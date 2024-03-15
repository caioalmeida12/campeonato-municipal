import { SetStateAction } from "react"

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

const handleGet = async <T>(route: string, query?: string[]) => {
    const queryString = query ? `?${query.join("&")}` : ""
    let result: ResponseType<T> = { success: false, response: null };

    const response = await fetch(`http://localhost:5000/${route}${queryString}`, {
        headers: {
            "X-JWT-token": localStorage.getItem("cm-jwt-token") || ""
        }
    })

    if (!response.ok) {
        result.response = "Nenhum registro encontrado!"
        return result;
    }

    const data = await response.json()
    result.success = true;
    result.response = data as T[];

    return result;
}

const handleCreate = async <T>(route: string, post: T) => {
    let result: ResponseType<T> = { success: false, response: null };

    const response = await fetch(`http://localhost:5000/${route}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-JWT-token": localStorage.getItem("cm-jwt-token") || ""
        },
        body: JSON.stringify(post)
    })

    if (!response.ok) {
        const data = await response.json()

        result.response = errorFormatter(data)
        return result;
    }

    const data = await response.json()

    result.success = true;
    result.response = data as T[];

    return result;
}

const handleDelete = async (route: string, id: string, shouldRefetch: boolean, setShouldRefetch: React.Dispatch<SetStateAction<boolean>>) => {
    let result: ResponseType<boolean> = { success: false, response: null };

    const response = await fetch(`http://localhost:5000/${route}?id=${id}`, {
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

export {
    handleGet,
    handleCreate,
    handleDelete
}