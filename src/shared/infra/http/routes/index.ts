import { Router } from "express";
import collectRouter from "./collectPrice.routes";

const router = Router();

router.use("/collect", collectRouter);

export { router };
