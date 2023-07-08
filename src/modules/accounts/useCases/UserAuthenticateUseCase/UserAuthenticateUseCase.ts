import { prisma } from "shared/infra/prisma/prisma";

export class UserAuthenticateUseCase {
  async execute(user_login: string) {
    const user = await prisma.uSR.findUnique({
      where: {
        USR_LOGIN: user_login,
      },
      select: {
        USR_LOGIN: true,
        USR_NOME: true,
      },
    });

    return { user };
  }
}
