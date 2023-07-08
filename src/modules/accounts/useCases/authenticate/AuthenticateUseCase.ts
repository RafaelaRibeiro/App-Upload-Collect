import { prisma } from "shared/infra/prisma/prisma";
import { compare } from "bcrypt";
import jwtSecret from "config/tokens";
import { sign } from "jsonwebtoken";

interface IAuthenticate {
  login: string;
  password: string;
}

export class AuthenticateUseCase {
  async execute({ login, password }: IAuthenticate) {
    if (!login) throw new Error("Login invalid");
    if (!password) throw new Error("Password invalid");

    const checkLogin = await prisma.uSR.findUnique({
      where: {
        USR_LOGIN: login,
      },
    });

    if (!checkLogin) {
      throw new Error("E-mail ou senha incorreto!");
    }

    const passwordMatch = await compare(
      password,
      checkLogin.USR_SENHA_EXATO ?? ""
    );

    if (!passwordMatch) throw new Error("E-mail ou senha incorreto!");

    const token = sign({ login }, jwtSecret.jwtSecret, {
      subject: checkLogin.USR_LOGIN.toString(),
      expiresIn: "7d",
    });
    return token;
  }
}
