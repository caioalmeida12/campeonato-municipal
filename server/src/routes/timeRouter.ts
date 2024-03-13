import { Router } from "express";
import timeController from "@server/controllers/timeController";

const timeRouter = Router()

<<<<<<< HEAD
timeRouter.get(String(process.env.ROUTE_TIMES) , timeController.get);
=======
timeRouter.get(String(process.env.ROUTE_TIMES), timeController.get);
>>>>>>> fichasTecnicas
timeRouter.post(String(process.env.ROUTE_TIMES), timeController.create);
timeRouter.put(String(process.env.ROUTE_TIMES), timeController.update);
timeRouter.delete(String(process.env.ROUTE_TIMES), timeController.delete);

export default timeRouter;