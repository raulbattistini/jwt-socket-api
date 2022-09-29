import { Request, Response, NextFunction } from "express";
import { connection } from "../db/connection";
import { generateUUID } from "../helpers/generateUUID";
import { User } from "../models/User";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { passwordCompareSync } from "../helpers/passwordCompare";


export var userRepo = connection.getRepository(User);

export class UserController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, username, password, createdAt } = req.body;

      const userExists = await userRepo.findOne({
        where: {
          username: username
        }
      })

      if (userExists) throw new Error("There is already an user with informed username.")

      const hashPassword = bcrypt.hashSync(password, 12);

      const user = userRepo.create({
        id: generateUUID(),
        username,
        password: hashPassword,
        createdAt,
      });

      await userRepo.save(user);

      const { password: _, ...User} = user;

      return res.status(201).json({
        message: `User with following information was created: ${User}`,
      });
    } catch (error: any) {
      return next(error.message);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const all = await userRepo.find({
        order: {
          username: "ASC",
        },
      });

      return res.status(200).json(all);
    } catch (error: any) {
      return next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userRepo.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!user)
        return res.status(404).json({
          message: `Sorry, there was no user with id ${req.params.id}`,
        });

      return res.json(user);
    } catch (error: any) {
      return next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, createdAt } = req.body;

      const user = userRepo.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!user)
        return res.status(404).json({
          message: `Sorry, there is no user with id ${req.params.id}`,
        });

      await userRepo
        .createQueryBuilder()
        .update(User)
        .set({
          id: req.params.id,
          username: username,
          password: password,
        })
        .execute();

      return res.status(200).json({
        message: `The user with id ${req.params.id} has the following info now: ${user}`,
      });
    } catch (error: any) {
      return next(error);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = await userRepo.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!user)
        return res.status(404).json({
          message: `There is no user with id ${req.params.id}`,
        });

      await userRepo.remove(user);

      return res.end();
    } catch (error: any) {
      return next(error);
    }
  }

  public async deleteAll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const all = await userRepo.find({
        order: {
          username: "ASC",
        },
      });

      await Promise //.resolve(() => {
      //   console.log("You're about to delete all users from the database.");
      // })
      //   .then(() => {
      //     console.log("You're about to delete all users from the database.");
      //   })
        // .catch((error: any) => {
        //   return next(error.message);
        // });
        //  unresolved promise would cause the future button to be clicked twice in order to remove. It's indeed not the best practice and only a side effect from the not so well structured code, but works at first glance

      await userRepo.remove(all);

      return res.end();
    } catch (error: any) {
      return next(error);
    }
  }
  public async login(req: Request, res: Response, next: NextFunction){
    const {username, password} = req.body;

    const user = await userRepo.findOne({
      where: {
        username: req.body.username
      }
    })

    if (!user){
      return res.status(404).json({
        message: "User not found. Please check your username/ password and try again."
      })
    }

    passwordCompareSync(user.password, password);

    if (!passwordCompareSync){
      return res.status(404).json({
        message: "User not found. Please check your username/ password and try again."
      })
    }

    const token = jwt.sign({id: user.id}, process.env.JWTPASS ?? "", {
      expiresIn: "Session",
    })

    const {password: _, ...userLogin} = user

    return res.json({
      user: userLogin,
      token: token
    })
  }
}
