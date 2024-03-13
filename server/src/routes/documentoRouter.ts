import { Router } from "express";
import documentoController from "@server/controllers/documentoController";

import multer from 'multer';
import path from "path";

const upload = multer({ dest: path.join(__dirname, '../../uploads'), storage: multer.memoryStorage()});

const documentoRouter = Router()

documentoRouter.get(String(process.env.ROUTE_DOCUMENTOS) , documentoController.get);
documentoRouter.post(String(process.env.ROUTE_DOCUMENTOS), upload.single("data"), documentoController.create);
documentoRouter.put(String(process.env.ROUTE_DOCUMENTOS), documentoController.update);
documentoRouter.delete(String(process.env.ROUTE_DOCUMENTOS), documentoController.delete);

export default documentoRouter;