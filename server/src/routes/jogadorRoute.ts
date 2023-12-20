import { Router } from "express";
import jogadorController from "@server/controllers/jogadorController";

const jogadorRouter = Router()

jogadorRouter.get(String(process.env.ROUTE_JOGADORES) , jogadorController.get);
jogadorRouter.post(String(process.env.ROUTE_JOGADORES), jogadorController.create);
jogadorRouter.put(String(process.env.ROUTE_JOGADORES), jogadorController.update);
jogadorRouter.delete(String(process.env.ROUTE_JOGADORES), jogadorController.delete);

export default jogadorRouter;