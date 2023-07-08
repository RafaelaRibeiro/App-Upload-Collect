import { prisma } from "shared/infra/prisma/prisma";
import { hash } from "bcrypt";

interface IFirstAccess {
  login: string;
  password: string;
  confirmPassword: string;
}

export class FirstAccessUseCase {
  async execute({ login, password, confirmPassword }: IFirstAccess) {
    if (!login)
      throw new Error("O campo de login não pode estar vazio" as string);
    if (!password)
      throw new Error("O campo de senha não pode estar vazio" as string);
    if (!confirmPassword)
      throw new Error(
        "O campo de confirmação de senha não pode estar vazio" as string
      );

    const existingUser = await prisma.uSR.findUnique({
      where: {
        USR_LOGIN: login,
      },
    });

    if (existingUser?.USR_SENHA_EXATO) {
      throw new Error("Password already registered");
    }

    if (password !== confirmPassword) throw new Error("Password not match");

    const passwordHash = await hash(password, 16);

    const updatedUser = await prisma.uSR.update({
      where: {
        USR_LOGIN: login,
      },
      data: {
        USR_SENHA_EXATO: passwordHash,
      },
    });

    return updatedUser;
  }
}
