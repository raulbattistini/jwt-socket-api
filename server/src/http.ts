import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import path from "path";
import { Server, Socket } from "socket.io";



const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

app.set("views", path.join(__dirname, "..", "public"));

app.engine("html", require("ejs").renderFile);

app.set("view engine", "html");

app.get("/pages/client", (req: Request, res: Response) => {
  return res.render("html/client.html");
});

app.get("/pages/admin", (req: Request, res: Response) => {
  return res.render("html/admin.html");
});
// both paths above still unset. only sample set. the path to the client side is still wrong and will not be plain html.

const http = createServer(app);

const io = new Server(http);

io.on("connection", (socket: Socket) => {
  console.log("User connected with id: ", socket.id);
});

app.use(express.json());

export { http, io }