import { Router } from "express";
import collectRouter from "./collectPrice.routes";
import authRouter from "./authenticate.routes";

const router = Router();

router.use("/collect", collectRouter);
router.use("/auth", authRouter);

export { router };
