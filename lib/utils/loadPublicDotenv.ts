import path from "path";
import dotenv from "dotenv";
import EnvVariableNotLoadedError from "@lib/errors/envVariableNotLoadedError";

const isLoadedDotenv = Boolean(
    dotenv.config({
        path: path.join(__dirname, "../../config/.env.public")
    })
)

const envVariables = [
    "PORT",
    "NODE_ENV",
    "ROUTE_JOGADORES",
    "DB_HOST",
    "DB_PORT",
    "DB_DIALECT",
    "DB_LOGGING"

];

envVariables.map((envVariable) => {
    if (!(envVariable in process.env)) throw new EnvVariableNotLoadedError(envVariable);
});

export default isLoadedDotenv;