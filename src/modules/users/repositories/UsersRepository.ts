import { verify } from "jsonwebtoken";
import { getRepository, Repository } from "typeorm";

import { User } from "../entities/User";
import authConfig from "@config/auth";
import { ICreateUserDTO } from "../useCases/createUser/ICreateUserDTO";
import { IUsersRepository } from "./IUsersRepository";
import { JWTInvalidTokenError } from "@shared/errors/JWTInvalidTokenError";
import { JWTTokenMissingError } from "@shared/errors/JWTTokenMissingError";

interface IPayload {
  sub: string;
}

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password });

    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({
      email,
    });
  }

  async findById(user_id: string): Promise<User | undefined> {
    return this.repository.findOne(user_id);
  }

  async findByToken(userToken: string): Promise<User | undefined> {
    const authHeader = userToken;

    if (!authHeader) {
      throw new JWTTokenMissingError();
    }

    const [, token] = authHeader.split(" ");

    try {
      const { sub: user_id } = verify(token, authConfig.jwt.secret) as IPayload;
      return this.repository.findOne(user_id);
    } catch {
      throw new JWTInvalidTokenError();
    }
  }
}
