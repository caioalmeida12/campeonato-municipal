import { Router } from "express";
import documentoController from "@server/controllers/documentoController";

const documentoRouter = Router()

documentoRouter.get(String(process.env.ROUTE_DOCUMENTOS) , documentoController.get);
documentoRouter.post(String(process.env.ROUTE_DOCUMENTOS), documentoController.create);
documentoRouter.put(String(process.env.ROUTE_DOCUMENTOS), documentoController.update);
documentoRouter.delete(String(process.env.ROUTE_DOCUMENTOS), documentoController.delete);

export default documentoRouter;