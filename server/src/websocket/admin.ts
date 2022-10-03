import { ConnectionsService } from './../service/ConnectionsService';
import { Socket } from "socket.io";
import { MessagesController } from "../controllers/MessagesController";
import { io } from "../http";

interface IMessage {
  user_id?: any;
  text?: any;
}

io.on("connect", async (socket: Socket) => {
  const allConnectionsWOAdmin = await ConnectionsService;
  io.emit("admin_list_all_users", allConnectionsWOAdmin);
  // @ts-ignore
  socket.on("admin_list_message_by_user", async (params, callback) => {
    var { user_id } = params;

    const allMessages = await MessagesController.listByUser(user_id);

    callback(allMessages);

    socket.on("admin_send_message", async (params) => {
      const { user_id, text } = params;

      MessagesController.create({
        text,
        user_id,
        admin_id: socket.id,
      }) as IMessage;
    });
    
    let socket_id = ConnectionsService.findByUserId(user_id) as unknown as string;
    io.to(socket_id).emit("admin_send_to_cliet", {
      Text,
      socket_id: socket.id
    });
   });

   socket.on("adnub_user_in_support", async (params)=>{
      const { user_id}  = params;
      await ConnectionsService.updateAdminId(user_id, socket.id);

      const allConnectionsWOAdmin = await ConnectionsService.findAllWithoutAdmin;

      io.emit("admin_list_all_users", allConnectionsWOAdmin);
   })
});
