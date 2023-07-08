import { Request, Response } from "express";
import { UserAuthenticateUseCase } from "./UserAuthenticateUseCase";

export class UserAuthenticateController {
  async handle(request: Request, response: Response) {
    const { user_login } = request;

    const userAuthenticateUseCase = new UserAuthenticateUseCase();
    const result = await userAuthenticateUseCase.execute(user_login);

    return response.json(result);
  }
}
