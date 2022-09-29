import { Router } from "express";
import { UserController } from "./controllers/UserController";
import authMiddleware from "./middlewares/authMiddleware";

type PathParams = string | RegExp | Array<string | RegExp>;

export const routes = Router();

routes.post("/api/users/", UserController.create);

routes.post("/api/login/", UserController.login);

routes.use(authMiddleware as unknown as PathParams);

routes.get("/api/users/", UserController.getAll);

routes.get("/api/:id", UserController.getById);

routes.put("/api/:id", UserController.update);

routes.delete("/api/users/", UserController.deleteAll);

routes.delete("/api/:id", UserController.deleteById);
