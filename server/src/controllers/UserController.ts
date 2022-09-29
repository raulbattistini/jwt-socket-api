import express, { Request, Response, NextFunction } from "express";
import { connection } from "../db/connection";
import { generateUUID } from "../helpers/generateUUID";
import { User } from "../models/User";

var userRepo = connection.getRepository(User);

export class UserController {
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, createdAt } = req.body;

      const user = userRepo.create({
        id: generateUUID(),
        username,
        password,
        createdAt,
      });

      await userRepo.save(user);

      return res.status(200).json({
        message: `User with following information was created: ${user}`
      });

    } catch (error: any) {
      
      return next(error.message);
    
    }
  }
}
