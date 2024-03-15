import Structure from "@/containers/Structure/Structure"
import React from "react"
import SearchGroup from "@/components/Search/SearchGroup"

const Documentos = () => {
    return (
        <Structure headerText="Controle de jogadores">
            Jogadores
            <SearchGroup buttonText="Adicionar jogador" />
        </Structure>
    )
}

export default Documentos