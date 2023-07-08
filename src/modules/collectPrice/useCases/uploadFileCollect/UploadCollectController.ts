import { Request, Response } from "express";
import { UploadCollectUseCase } from "./UploadCollectUseCases";

export class UploadCollectController {
  async handle(request: Request, response: Response) {
    const { collectSerie, collectNum } = request.query;

    const { file } = request;
    if (file) {
      const { buffer } = file;
      const uploadCollectUseCase = new UploadCollectUseCase();

      const result = await uploadCollectUseCase.execute(
        buffer,
        collectSerie as string,
        collectNum as string
      );
      return response.json(result);
    }
  }
}
