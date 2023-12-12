class SequelizeNullishResultError extends Error {
  constructor(fields: string | Array<unknown>, values: string | Array<unknown>) {
    if (fields instanceof Array) fields = fields.join(", ");
    if (values instanceof Array) values = values.join(", ");

    super(`Empty result for field(s) ${fields} with value(s) ${values}`);
  }
  
}

export default SequelizeNullishResultError;