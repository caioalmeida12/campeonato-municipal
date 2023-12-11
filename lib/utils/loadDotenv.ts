import path from "path";
import dotenv from "dotenv";
import { EnvVariableNotLoadedError } from "@lib/errors/envVariableNotLoadedError";

const isLoadedDotenv = Boolean(
    dotenv.config({
        path: path.join(__dirname, "../../config/.env")
    })
)

const envVariables = [
    "PORT",
    "NODE_ENV",
    "ROUTE_JOGADORES",
];

envVariables.map((envVariable) => {
    if (!Boolean(process.env[envVariable])) throw new EnvVariableNotLoadedError(envVariable);
});

export default isLoadedDotenv;