import { Router } from "express";
import timeController from "@server/controllers/timeController";

const timeRouter = Router()

timeRouter.get(String(process.env.ROUTE_TIMES), timeController.get);
timeRouter.post(String(process.env.ROUTE_TIMES), timeController.create);
timeRouter.put(String(process.env.ROUTE_TIMES), timeController.update);
timeRouter.delete(String(process.env.ROUTE_TIMES), timeController.delete);

export default timeRouter;