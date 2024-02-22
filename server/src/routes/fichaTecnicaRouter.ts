import { Router } from "express";
import fichaTecnicaController from "@server/controllers/fichaTecnicaController";

const fichaTecnicaRouter = Router()

fichaTecnicaRouter.get(String(process.env.ROUTE_FICHAS_TECNICAS) , fichaTecnicaController.get);
fichaTecnicaRouter.post(String(process.env.ROUTE_FICHAS_TECNICAS), fichaTecnicaController.create);
fichaTecnicaRouter.put(String(process.env.ROUTE_FICHAS_TECNICAS), fichaTecnicaController.update);
fichaTecnicaRouter.delete(String(process.env.ROUTE_FICHAS_TECNICAS), fichaTecnicaController.delete);

export default fichaTecnicaRouter;