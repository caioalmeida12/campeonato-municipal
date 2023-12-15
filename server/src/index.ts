import isSetupOK from "@server/core/setup";
import Server from "@server/core/server";

if (!isSetupOK) throw new Error("A configuração do ambiente não está OK. Verifique os logs para ver o que está errado.");

const server = new Server();

server.start(() => {
    console.log(`Servidor rodando na porta ${server.port}`);
});
