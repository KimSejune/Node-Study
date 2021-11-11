import * as dotenv from "dotenv";
import express, { Application } from "express";
dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app: Application = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Node Server Start Port: ${process.env.PORT}`);
});
