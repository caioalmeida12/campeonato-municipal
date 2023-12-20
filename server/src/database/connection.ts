import path from "path";
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

if (!["sqlite", "postgres"].includes(process.env.DB_DIALECT as string)) throw new Error(`Database dialect "${process.env.DB_DIALECT}" not supported`);

let sequelizeConfig = {
    dialect: process.env.DB_DIALECT as Dialect,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    models: [path.resolve(__dirname, '../models/')],
    storage: "" as string | undefined,
    username: "" as string | undefined,
    password: "" as string | undefined,
    database: "" as string | undefined,
    logging: process.env.DB_LOGGING == "true" ? console.log : false,
}

switch (process.env.DB_DIALECT) {
    case "sqlite":
        sequelizeConfig = {
            ...sequelizeConfig,
            storage: process.env.DB_STORAGE,
        };
        break;
    case "postgres":
        sequelizeConfig = {
            ...sequelizeConfig,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        };
        break;
}

const sequelize = new Sequelize(sequelizeConfig);

sequelize.sync({ 
    force: Boolean(process.env.DB_DATABASE?.includes("test")), 
 }).then(() => {
    console.log(`\x1b[36m\nSuccessfully connected to database "${process.env.DB_NAME}" with "${process.env.DB_DIALECT}" dialect\n\x1b[0m`);
}).catch((error) => {
    console.log(`\x1b[31m\nError connecting to database "${process.env.DB_NAME}" with "${process.env.DB_DIALECT}" dialect\n\x1b[0m`);
    console.log(error);
});

export default sequelize;