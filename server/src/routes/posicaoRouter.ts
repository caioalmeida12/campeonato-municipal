import { Router } from "express";
import posicaoController from "@server/controllers/posicaoController";

const posicaoRouter = Router()

posicaoRouter.get(String(process.env.ROUTE_POSICOES) , posicaoController.get);
posicaoRouter.post(String(process.env.ROUTE_POSICOES), posicaoController.create);
posicaoRouter.put(String(process.env.ROUTE_POSICOES), posicaoController.update);
posicaoRouter.delete(String(process.env.ROUTE_POSICOES), posicaoController.delete);

export default posicaoRouter;