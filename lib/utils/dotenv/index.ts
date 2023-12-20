import publicDotenv from "./definitions/publicDotenv";
import databaseDotenv from "./definitions/databaseEnv";
import modelsDotenv from "./definitions/modelDotenv";
import jwtDotenv from "./definitions/jwtDotenv";
import loadEnvVariables from "./loadEnvVariables";

const isLoadedPublicDotenv = loadEnvVariables(".env.public", publicDotenv);
const isLoadedDatabaseDotenv = loadEnvVariables(".env.database.local", databaseDotenv);
const isLoadedModelsDotenv = loadEnvVariables(".env.models.local", modelsDotenv);
const isLoadedJwtDotenv = loadEnvVariables(".env.jwt.local", jwtDotenv);

export default Boolean(isLoadedPublicDotenv && isLoadedDatabaseDotenv && isLoadedModelsDotenv && isLoadedJwtDotenv);