import { Request, Response } from "express";
import { ListMaterialsUseCase } from "./ListMaterialsCollectUseCase";

export class ListMaterialsCollectController {
  async handle(request: Request, response: Response) {
    const { file } = request;
    if (file) {
      const { buffer } = file;
      const listMaterialsUseCase = new ListMaterialsUseCase();
      const result = await listMaterialsUseCase.execute(buffer);

      return response.json(result);
    }
  }
}
