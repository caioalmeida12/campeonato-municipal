import { Router } from "express";
import esporteController from "@server/controllers/esporteController";

const esporteRouter = Router()

esporteRouter.get(String(process.env.ROUTE_ESPORTES) , esporteController.get);
esporteRouter.post(String(process.env.ROUTE_ESPORTES), esporteController.create);
esporteRouter.put(String(process.env.ROUTE_ESPORTES), esporteController.update);
esporteRouter.delete(String(process.env.ROUTE_ESPORTES), esporteController.delete);

export default esporteRouter;