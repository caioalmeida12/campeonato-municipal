import { Router } from "express";
import responsavelController from "@server/controllers/responsavelController";

const responsavelRouter = Router()

responsavelRouter.get(String(process.env.ROUTE_RESPONSAVEIS) , responsavelController.get);
responsavelRouter.post(String(process.env.ROUTE_RESPONSAVEIS), responsavelController.create);
responsavelRouter.put(String(process.env.ROUTE_RESPONSAVEIS), responsavelController.update);
responsavelRouter.delete(String(process.env.ROUTE_RESPONSAVEIS), responsavelController.delete);

export default () => responsavelRouter;