import path from "path";
import dotenv from "dotenv";
import EnvVariableNotLoadedError from "@lib/errors/envVariableNotLoadedError";

const isLoadedModelsDotenv = Boolean(
    dotenv.config({
        path: path.join(__dirname, "../../config/.env.models.local")
    })
)

const envVariables = [
    "MODEL_JOGADOR_TABLE_NAME",
];

envVariables.map((envVariable) => {
    if (!(envVariable in process.env)) throw new EnvVariableNotLoadedError(envVariable);
});

export default isLoadedModelsDotenv;