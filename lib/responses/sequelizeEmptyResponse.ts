class SequelizeEmptyResponse extends Error {
  constructor(query: Record<string, unknown>) {
    if (Object.keys(query).length) super(`Empty result for field(s) ${Object.keys(query).join(", ")} with value(s) ${Object.values(query).join(", ")}`);
    else super("Empty result");
  }
}

export default SequelizeEmptyResponse;