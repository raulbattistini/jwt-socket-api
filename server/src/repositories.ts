import { connection } from "./db/connection";
import { Connection } from "./models/Connection";
import { Message } from "./models/Message";
import { Setting } from "./models/Setting";
import { User } from "./models/User";


export const settingsRepo = connection.getRepository(Setting);

export const messagesRepo = connection.getRepository(Message);

export const userRepo = connection.getRepository(User);

export const connectionsRepo = connection.getRepository(Connection);