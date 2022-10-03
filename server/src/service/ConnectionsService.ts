import { Request, Response, NextFunction } from "express";
import { IsNull } from "typeorm";
import { Connection } from "../models/Connection";
import { connectionsRepo } from "../repositories";

export class ConnectionsService {
  public static async create(socket_id?: string, user_id?: string, req?: Request, res?: Response, next?: NextFunction) {
    const { id, admin_id } =
      req!.body as unknown as Connection;
    try {
      const connection = connectionsRepo.create({
        socket_id,
        user_id,
        admin_id: admin_id,
        id: id,
      });
      try {
        await connectionsRepo.save(connection);

        return res!.status(201).json({
          message: `Connection saved with info: ${connection}`,
        });
      } catch (error: any) {
        throw new Error(
          `An error occurred while saving the connection: ${error.message}`
        );
      }
    } catch (error: any) {
      throw new Error(`Something wrong occurred: ${error.message}`);
    }
  }

  public static async findBySocketId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { socket_id } = req.body;
    const connection = await connectionsRepo.findOne({
      where: {
        socket_id: socket_id,
      },
    });
    try {
      if (!connection)
        return res.status(404).json({
          message: `There is no user identified by socket ${socket_id}`,
        });
      return connection;
    } catch (error) {
      return next(error);
    }
  }

  public static async updateAdminId(
    user_id: string,
    socked_id: string,
    req?: Request,
    res?: Response,
    next?: NextFunction
  ) {
    const { admin_id } = req!.body;
    try {
      await connectionsRepo
        .createQueryBuilder()
        .update(Connection)
        .set({
          admin_id: admin_id,
        })
        .execute();
    } catch (error: any) {
      throw new Error(`Something wrong occurred: ${error.message}`);
    }
  }

  public static async deleteBySocketId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await connectionsRepo
        .createQueryBuilder()
        .delete()
        .where("socket_id = :socket_id")
        .execute();
    } catch (error) {
      return next(error);
    }
  }

  public static async findAllWithoutAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const connections = await connectionsRepo.find({
        where: {
          admin_id: IsNull(),
        },
        relations: ["user"],
      });
      if (!connections)
        return res.status(404).json({
          message: `There were no connections... Maybe?`,
        });
      return connections;
    } catch (error) {
      return next(error);
    }
  }

  public static async findByUserId(
    req?: Request,
    res?: Response,
    next?: NextFunction,
    user_id?: string
  ) {
    try {
      const connection = await connectionsRepo.findOne({
        where: {
          user_id,
        },
      });

      if (!user_id)
        return res!
          .status(404)
          .json({ message: `No user with such id ${user_id}` });
      return res!.status(200).json({ message: `User ${user_id}` });
    } catch (error: any) {
      throw new Error(`An error occurred: ${error.message}`);
    }
  }
}
