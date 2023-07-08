import { Request, Response } from "express";

import { AuthenticateUseCase } from "./AuthenticateUseCase";

export class AuthenticateController {
  async handle(request: Request, response: Response) {
    const { login, password } = request.body;
    const authenticateUseCase = new AuthenticateUseCase();

    const result = await authenticateUseCase.execute({ login, password });

    return response.json(result);
  }
}
