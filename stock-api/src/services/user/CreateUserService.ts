import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { CreateUserRequest } from "../../models/interfaces/user/CreateUserRequest";

class CreateUserService {
  async execute({ name, email, password }: CreateUserRequest) {
    if (!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("Email already exists");
    }

    // Encriptando a senha do usuário
    const passwordHash = await hash(password, 8);

    // Criando o usuário no banco de dados
    const user = await prismaClient.user.create({  // Adicionei await aqui
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return user;
  }
}

export { CreateUserService };