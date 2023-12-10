import Server from "./core/server";

const server = new Server();

server.start(() => {
    console.log(`Server running on port ${server.port}`);
});