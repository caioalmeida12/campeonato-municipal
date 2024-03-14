import { Router } from "express";
import authController from "@server/controllers/authController";

const authRouter = Router()

// enderecoRouter.get(String(process.env.ROUTE_AUTH) , authController.get);
authRouter.post(String(process.env.ROUTE_AUTH), authController.login);
// enderecoRouter.put(String(process.env.ROUTE_AUTH), authController.update);
// enderecoRouter.delete(String(process.env.ROUTE_AUTH), authController.delete);

export default authRouter;