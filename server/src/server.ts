import express from "express";
import "dotenv/config";
import cors from "cors";
import { connection } from "./db/connection";
import helmet from "helmet";
import { routes } from "./routes";
const app = express();

const port = 3333; //process.env.PORT;

connection
  .initialize()
  .then(() => {
    app.use(cors());

    app.use(helmet());

    app.use(express.json());

    app.use(routes);

    console.log(
      `PostgreSQL db running on ${process.env.HOST}:${process.env.DB_PORT}` //127.0.0.1:5432
    );
    return app.listen(port, () => {
      console.log(`Server is running on port ${port}!`);
    });
  })
  .catch((error: any) => {
    console.log(`An error occurred during database initialization: ${error}`);
  });
