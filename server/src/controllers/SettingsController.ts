import { NextFunction, Request, Response } from "express";
import { connection } from "../db/connection";
import { Setting } from "../models/Setting";

var settingsRepo = connection.getRepository(Setting);

export class SettingsController {
  public static async create(
    req?: Request,
    res?: Response,
    next?: NextFunction
  ) {
    try {
      const { id, username, chat } = req!.body;

      const userAlreadyExists = await settingsRepo.findOne({
        where: {
          id: id,
        },
      });

      if (!userAlreadyExists)
        return res!.status(409).json({
          message: "There is an user with this id already.",
        });
      const settings = settingsRepo.create({
        chat: chat,
        username: username,
      });
      await settingsRepo.save(settings);

      return res!.status(201).json({
        message: `Created user with info: ${settings}`,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  public static async findByUsername(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { username } = req.body;

    try {
      const settings = await settingsRepo.findOne({
        where: {
          username: username,
        },
      });
      if (!settings)
        return res.status(404).json({
          message: `Username ${username} not found... Try searching for another?`,
        });
      return res.status(200).json({
        settings,
      });
    } catch (error) {
      return next(error);
    }
  }
  public static async update(req: Request, res: Response, next: NextFunction) {
    const { chat } = req.body;
    await settingsRepo
      .createQueryBuilder()
      .update(Setting)
      .set({ chat: chat })
      .where("username = :username")
      .execute();
  }
}
