import { Router } from "express";
import { ListMaterialsCollectController } from "modules/collectPrice/useCases/listMaterialsCollect/ListMaterialsCollectController";
import { UploadCollectController } from "modules/collectPrice/useCases/uploadFileCollect/UploadCollectController";
import { ensureAuthenticate } from "src/shared/infra/http/middlewares/ensureAuthenticate";
import multer from "multer";
const multerConfig = multer();

const uploadCollectController = new UploadCollectController();
const listMaterialsController = new ListMaterialsCollectController();
const collectRouter = Router();

collectRouter.post(
  "/",
  ensureAuthenticate,
  multerConfig.single("file"),
  uploadCollectController.handle
);

collectRouter.post(
  "/list",
  ensureAuthenticate,
  multerConfig.single("file"),
  listMaterialsController.handle
);

export default collectRouter;
