import express from "express";
import "dotenv/config";
import cors from 'cors';
import { connection } from "./db/connection";

const app = express();

const port = process.env.PORT;

app.use(cors());

app.use(express.json());

connection
  .initialize()
  .then(() => {
    console.log(
      `PostgreSQL db running on ${process.env.HOST}:${process.env.DB_PORT}`
    );
  })
  .catch((error: any) => {
    console.log(
      `An error occurred during database initialization: ${error}`
    );
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
