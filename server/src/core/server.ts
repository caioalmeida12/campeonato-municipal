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

        this.setup(requestMiddlewares);
        this.setup(responseMiddlewares);
        this.setup(routes);
        this.setup(errorMiddlewares);
    }

    start(callback: Function) {
        this.app.listen(this.port, callback());
    }

    setup(component: Array<Function>) {
        component.map(component => {
            this.app.use(component())

            if (process.env.NODE_ENV === "development") console.log(`Component ${component.name || component.toString().replace("() => ", "")} loaded`);
        });
    }
}

export default Server;
