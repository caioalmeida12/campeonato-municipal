import express from "express";

import morgan from "morgan";
import { errorMiddlewares, requestMiddlewares, responseMiddlewares } from "@server/middlewares";
import routes from "@server/routes";

class Server {
    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 5000;

        if (process.env.NODE_ENV === "development") this.app.use(morgan("dev"));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.addComponent(requestMiddlewares);
        this.addComponent(routes);
        this.addComponent(responseMiddlewares);
        this.addComponent(errorMiddlewares);

        this.app.use("/health", (req, res) => res.status(200).json({ status: "OK" }));
    }

    start(callback: Function) {
        this.app.listen(this.port, callback());
    }

    addComponent(component: Array<Function>) {
        component.map(component => {
            this.app.use(component())

            if (process.env.NODE_ENV === "development") console.log(`✔ Component \x1b[35m${component.name || component.toString().replace("() => ", "")}\x1b[0m added to server`);
        });
    }
}

export default Server;
