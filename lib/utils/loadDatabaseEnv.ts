import path from "path";
import dotenv from "dotenv";
import EnvVariableNotLoadedError from "@lib/errors/envVariableNotLoadedError";

const isLoadedDatabaseDotenv = Boolean(
    dotenv.config({
        path: path.join(__dirname, "../../config/.env.database.local")
    })
)

const envVariables = [
    "DB_DATABASE",
    "DB_USERNAME",
    "DB_PASSWORD"
];

envVariables.map((envVariable) => {
    if (!(envVariable in process.env)) throw new EnvVariableNotLoadedError(envVariable);
});

export default isLoadedDatabaseDotenv;