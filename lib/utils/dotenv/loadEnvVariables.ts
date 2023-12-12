import EnvVariableNotLoadedError from "@lib/errors/envVariableNotLoadedError";

import path from "path";
import dotenv from "dotenv";


export default function loadEnvVariables(fileName: string, variables: Array<string>): boolean {
    dotenv.config({
        path: path.resolve(__dirname, `../../../config/${fileName}`),
    });
    
    variables.map((variable) => {
        if (!(variable in process.env)) throw new EnvVariableNotLoadedError(variable);
    });

    return true;
}