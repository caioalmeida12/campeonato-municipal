import { EnvVariableNotLoadedError } from "@lib/errors/envVariableNotLoadedError";
import isLoadedDotenv from "@lib/utils/loadDotenv";
import Server from "@server/core/server";

if (!isLoadedDotenv) throw new EnvVariableNotLoadedError("DOTENV");

const server = new Server();

server.start(() => {
    console.log(`Server running on port ${server.port}`);
});
