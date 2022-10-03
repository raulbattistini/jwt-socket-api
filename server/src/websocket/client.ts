import { Socket } from "socket.io";
import { MessagesController } from "../controllers/MessagesController";
import { UserController } from "../controllers/UserController";
import { io } from "../http";
import { ConnectionsService } from "../service/ConnectionsService";

interface IParams {
  text: string;
  email: string; //username?
}

io.on("connect", (socket) => {
  socket.on("client_first_access", async (params: IParams) => {
    const socket_id = socket.id;
    const { text, email } = params;

    let user_id = null;

    const userExists = await UserController.getById;

    if (!userExists) {
      // @ts-ignore
      const user = await UserController.create(email);
      // @ts-ignore
      await ConnectionsService.create({
        socket_id, // @ts-ignore
        user_id: user.id,
      });
      // @ts-ignore-all
      user_id = user.id;
    } else {
      user_id = UserController.getById;

      const connection = await ConnectionsService.findByUserId;

      if (!connection) {
        await ConnectionsService.create(socket_id);
      } else {
        await ConnectionsService.create(...Response.name);
      }
    }
    await MessagesController.create({
      text,
      user_id,
    });

    const allMessages = await MessagesController.listByUser;

    socket.emit("client_list_all_messages", allMessages);

    const allUsers = await ConnectionsService.findAllWithoutAdmin;

    io.emit("admin_list_all_users", allUsers);
  });

  socket.on("client_send_to_admin", async (params) => {
    const { text, socket_admin_id } = params;

    const socket_id = socket.id;
    // @ts-ignore
    const { user_id } = await ConnectionsService.findBySocketId(...socket_id);

    const message = await MessagesController.create;

    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id,
    });

    socket.on("disconnect", async () => {
      console.log(socket.id);

      await ConnectionsService.deleteBySocketId;
    });
  });
});
