import { Socket } from 'socket.io';
import { MessagesController } from '../controllers/MessagesController';
import {io} from '../http'
import { ConnectionsService } from '../service/ConnectionsService'



io.on("connect", async(socket: Socket)=>{
   const allConnectionsWOAdmin = await ConnectionsService.findAllWithoutAdmin;
// @ts-ignore
   io.emit("admin_list_message_by_user", async (params, callback) =>{
      const { user_id} = params;

      const allMessages = await MessagesController.listByUser(user_id);

      callback(allMessages);

   })
})