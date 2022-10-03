import { Request, Response, NextFunction } from "express";
import { messagesRepo } from "../repositories";

export class MessagesController {
  public static async listByUser(
    user_id: string,
    res?: Response,
    next?: NextFunction
  ) {
    try {
      const list = await messagesRepo.findOne({
        where: {
          user_id: user_id,
        },
        relations: ["user"],
      });
      if (!user_id)
        return res!.status(404).json({
          message: `There was no user with id ${user_id}`,
        });
      return res!.status(202).json({
        message: `User: ${user_id}, other: ${list}`,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public static async showByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { user_id, id } = req.params;

    try {
      const list = await messagesRepo.findOne({
        where: {
          user_id: user_id,
        },
        relations: ["user"],
      });
      if (!user_id)
        return res!.status(404).json({
          message: `There was no user with id ${user_id}`,
        });
      return res!.status(202).json({
        message: `User: ${user_id}, other: ${list}`,
      });
    } catch (error: any) {
      return next(error);
    }
  }

  public static async create(admin_id?: string | any, text?: string, req?: Request, res?: Response, next?: NextFunction){
    try {
      const { admin_id, text, user_id } = req!.body;

      const message = await messagesRepo.create({
        admin_id,
        text, 
        user_id
      })

      if(!req!.body) return res!.status(204).json({
        message: "Invalid body"
      })
      await messagesRepo.save(message);

      return res!.status(201).json({
        message: `New message with info: ${message}`
      })
    } catch (error: any) {
      throw new Error(`Something wrong occurred: ${error.message}`);
    }
  }
}

//todo: refactore the code
