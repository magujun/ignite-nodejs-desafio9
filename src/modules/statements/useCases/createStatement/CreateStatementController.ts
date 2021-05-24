import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateStatementUseCase } from "./CreateStatementUseCase";

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
  TRANSFER = "transfer",
}

export class CreateStatementController {
  async execute(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { amount, description } = request.body;

    const splittedPath = request.originalUrl.split("/");
    const type = splittedPath[splittedPath.length - 1] as OperationType;
    if (type === "transfer") {
      const { sender: sender_id } = request.params;
      const createStatement = container.resolve(CreateStatementUseCase);
      const statement = await createStatement.execute({
        sender_id,
        user_id,
        type,
        amount,
        description,
      });
      return response.status(201).json(statement);
    }
    const createStatement = container.resolve(CreateStatementUseCase);
    const statement = await createStatement.execute({
      user_id,
      type,
      amount,
      description,
    });
    return response.status(201).json(statement);
  }
}
