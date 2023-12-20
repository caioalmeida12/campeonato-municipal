const validarCamposParaBusca = (query: Record<string, unknown>, camposPermitidosParaBusca: string[]): Array<{ campo: string, valor: unknown }> => {
    return camposPermitidosParaBusca.filter(campo => query[campo]).map(campo => ({ campo, valor: query[campo] }))
}

export default validarCamposParaBusca