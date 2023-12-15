import isSetupOK from "@server/core/setup";
import Server from "@server/core/server";

if (!isSetupOK) throw new Error("Environment setup not OK. Check logs to see what's wrong.");

const server = new Server();

server.start(() => {
    console.log(`Servidor rodando na porta ${server.port}`);
});
