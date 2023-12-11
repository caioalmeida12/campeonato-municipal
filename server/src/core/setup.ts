import EnvVariableNotLoadedError from "@lib/errors/envVariableNotLoadedError";
import isLoadedDatabaseDotenv from "@lib/utils/loadDatabaseEnv";
import isLoadedModelsDotenv from "@lib/utils/loadModelDotenv";
import isLoadedPublicDotenv from "@lib/utils/loadPublicDotenv";

if (!isLoadedPublicDotenv) throw new EnvVariableNotLoadedError("DOTENV");
if (!isLoadedDatabaseDotenv) throw new EnvVariableNotLoadedError("DATABASE DOTENV");
if (!isLoadedModelsDotenv) throw new EnvVariableNotLoadedError("MODELS DOTENV");

const isSetupOK = Boolean(
    isLoadedPublicDotenv &&
    isLoadedDatabaseDotenv &&
    isLoadedModelsDotenv
);

export default isSetupOK;