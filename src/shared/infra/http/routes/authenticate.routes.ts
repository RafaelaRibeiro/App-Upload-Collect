import { Router } from "express";
import { UserAuthenticateController } from "modules/accounts/useCases/UserAuthenticateUseCase/UserAuthenticateController";
import { AuthenticateController } from "modules/accounts/useCases/authenticate/AuthenticateController";
import { FirstAccessController } from "modules/accounts/useCases/firstAccess/FirstAccessController";
import { ensureAuthenticate } from "src/shared/infra/http/middlewares/ensureAuthenticate";

const authRouter = Router();

const firstAccessController = new FirstAccessController();
const userAuthenticateController = new UserAuthenticateController();
const authenticateController = new AuthenticateController();

authRouter.post("/", authenticateController.handle);
authRouter.put("/first", firstAccessController.handle);
authRouter.get("/user", ensureAuthenticate, userAuthenticateController.handle);

export default authRouter;
