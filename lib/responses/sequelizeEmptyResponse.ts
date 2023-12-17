class SequelizeEmptyResponse extends Error {
  constructor(query: Record<string, unknown>) {
    if (Object.keys(query).length) super(`Nenhum resultado para o(s) campo(s) ${Object.keys(query).join(", ")} com valor(es) ${Object.values(query).join(", ")}`);
    else super("Nenhum resultado encontrado");
  }
}

export default SequelizeEmptyResponse;