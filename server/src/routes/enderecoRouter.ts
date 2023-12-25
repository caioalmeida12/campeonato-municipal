import { Router } from "express";
import enderecoController from "@server/controllers/enderecoController";

const enderecoRouter = Router()

enderecoRouter.get(String(process.env.ROUTE_ENDERECOS) , enderecoController.get);
enderecoRouter.post(String(process.env.ROUTE_ENDERECOS), enderecoController.create);
enderecoRouter.put(String(process.env.ROUTE_ENDERECOS), enderecoController.update);
enderecoRouter.delete(String(process.env.ROUTE_ENDERECOS), enderecoController.delete);

export default enderecoRouter;