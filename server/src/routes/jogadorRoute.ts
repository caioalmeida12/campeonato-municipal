import { Router } from "express";
import jogadorController from "@server/controllers/jogadorController";

const jogadorRouter = Router()

jogadorRouter.get(String(process.env.ROUTE_JOGADORES) , jogadorController.index);

export default () => jogadorRouter;