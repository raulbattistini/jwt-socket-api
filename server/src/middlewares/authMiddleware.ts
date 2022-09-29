import { NextFunction } from "express";
import { UnAuthError } from "../helpers/errors";
import jwt from "jsonwebtoken";
import { userRepo } from "../controllers/UserController";

type AuthorizedRequest = Express.Request & { authorization: string };

type JwtPayload = {
  id: string;
};
export interface IGetUserAuthInfoRequest extends Request {
  user: {
    id: string;
    username: string;
    createdAt: Date;
  };
}

const authMiddleware = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers as unknown as AuthorizedRequest;

  if (!authorization)
    throw new UnAuthError("Not authorized to perform action.");

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;

  let user = await userRepo.findOne({
    where: {
      id: id,
    },
  });

  if (!user) {
    throw new UnAuthError("Not authorized to perform action.");
  }

  const { password: _, ...loggedUser } = user;

  req.user = loggedUser;

  next();
};

export default authMiddleware;