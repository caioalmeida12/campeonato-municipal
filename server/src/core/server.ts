import express from "express";
import dotenv from "dotenv";

dotenv.config();

class Server {
    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 5000;
    }

    start(callback: Function) {
        this.app.listen(this.port, callback());
    }
}

export default Server;
